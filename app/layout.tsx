export const metadata = {
  title: 'Lịch Spa Nội Bộ',
  description: 'Hệ thống quản lý lịch đặt Spa',
};

// Bắt buộc phải có "export default function" ở dòng này
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}