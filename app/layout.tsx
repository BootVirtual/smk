import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Demo School - SMK",
	description: "Management and communications platform for Demo School",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={inter.variable}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthProvider>
					<SidebarProvider>
						<AppSidebar />
						<main className="w-full">
							<header className="flex h-16 shrink-0 items-center gap-2 border-b w-full max-w">
								<div className="flex items-center gap-2 px-3">
									<SidebarTrigger />
								</div>
							</header>
							<div className="bg-background text-foreground flex min-w-0 flex-1 flex-col items-start gap-6 p-4 sm:p-6 *:[div:not([class*='w-'])]:w-full">
								{children}
							</div>
						</main>
					</SidebarProvider>
				</AuthProvider>
			</body>
		</html>
	);
}