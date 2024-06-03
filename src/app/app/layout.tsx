import Header from "@/components/Header"
import "../../components/Sidebar"
import Sidebar from "../../components/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full px-7 sm:px-16 py-6 sm:py-10 h-screen max-h-screen overflow-auto">
          <Header />
          {children}
        </div>
      </div>
    </>
  )
}
