import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'your-secret-key');

export interface AdminUser {
  email: string;
  role: string;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token');

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    
    return {
      email: payload.email as string,
      role: payload.role as string
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  
  return user;
}

// Middleware helper for API routes
export async function withAuth(handler: Function) {
  return async (request: Request, context?: any) => {
    try {
      await requireAdmin();
      return handler(request, context);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  };
}
