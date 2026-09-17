import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Tài khoản nội bộ",
      credentials: {
        username: { label: "Tài khoản", type: "text", placeholder: "Nhập tài khoản" },
        password: { label: "Mật khẩu", type: "password", placeholder: "Nhập mật khẩu" }
      },
      async authorize(credentials) {
        // Lấy thông tin từ file .env.local
        const adminUser = process.env.ADMIN_USER;
        const adminPass = process.env.ADMIN_PASS;

        // Kiểm tra xem người dùng nhập có khớp với env không
        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPass
        ) {
          // Trả về một object user nếu đúng
          return { id: "1", name: "Admin Spa" };
        }
        
        // Trả về null nếu sai (NextAuth sẽ tự động văng lỗi)
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login', // Trỏ đến trang giao diện đăng nhập tùy chỉnh của chúng ta
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };