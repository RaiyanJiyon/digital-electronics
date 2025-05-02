"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Package, ShoppingCart, Users, Activity, Eye, BarChart3, Clock, AlertCircle, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"

// Sample data for charts
const revenueData = [
  { name: "Jan", total: 1800 },
  { name: "Feb", total: 2200 },
  { name: "Mar", total: 2800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2900 },
  { name: "Jun", total: 3500 },
  { name: "Jul", total: 3200 },
  { name: "Aug", total: 3800 },
  { name: "Sep", total: 4000 },
  { name: "Oct", total: 4500 },
  { name: "Nov", total: 4700 },
  { name: "Dec", total: 5200 },
]

const categoryData = [
  { name: "Smartphones", value: 40 },
  { name: "Laptops", value: 30 },
  { name: "Accessories", value: 20 },
  { name: "Wearables", value: 10 },
]

// Sample recent orders
const recentOrders = [
  {
    id: "ORD-7352",
    customer: "John Doe",
    email: "john@example.com",
    amount: "$125.99",
    status: "completed",
    date: "2 minutes ago",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD-7353",
    customer: "Alice Smith",
    email: "alice@example.com",
    amount: "$89.99",
    status: "processing",
    date: "25 minutes ago",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD-7354",
    customer: "Bob Johnson",
    email: "bob@example.com",
    amount: "$432.50",
    status: "pending",
    date: "1 hour ago",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD-7355",
    customer: "Emma Wilson",
    email: "emma@example.com",
    amount: "$65.25",
    status: "completed",
    date: "3 hours ago",
    avatar: "/placeholder.svg",
  },
  {
    id: "ORD-7356",
    customer: "Michael Brown",
    email: "michael@example.com",
    amount: "$199.99",
    status: "cancelled",
    date: "5 hours ago",
    avatar: "/placeholder.svg",
  },
]

// Sample low stock products
const lowStockProducts = [
  {
    id: "PRD-1234",
    name: "iPhone 15 Pro Max",
    category: "Smartphones",
    stock: 3,
    threshold: 10,
    price: "$1,199.00",
  },
  {
    id: "PRD-2345",
    name: "Samsung Galaxy Watch 6",
    category: "Wearables",
    stock: 5,
    threshold: 15,
    price: "$349.99",
  },
  {
    id: "PRD-3456",
    name: "Sony WH-1000XM5",
    category: "Accessories",
    stock: 2,
    threshold: 8,
    price: "$399.99",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <SidebarProvider>
      <AppSidebar />
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Reports</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +20.1%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +12.4%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,834</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +8.2%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.24%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 inline-flex items-center">
                    <ArrowDown className="mr-1 h-4 w-4" /> -1.5%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders and Low Stock */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You have {recentOrders.length} orders today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={order.avatar || "/placeholder.svg"} alt="Avatar" />
                        <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                      <div className="ml-auto font-medium">{order.amount}</div>
                      <div className="ml-4">
                        <Badge 
                          variant={
                            order.status === "completed" ? "default" : 
                            order.status === "processing" ? "secondary" : 
                            order.status === "pending" ? "outline" : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Orders</Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Low Stock Products</CardTitle>
                <CardDescription>
                  {lowStockProducts.length} products below threshold
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {lowStockProducts.map((product) => (
                    <div key={product.id}>
                      <div className="flex items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="ml-auto">{product.price}</div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground">Stock:</span>
                          <span className="ml-auto font-medium">{product.stock}/{product.threshold}</span>
                        </div>
                        <Progress 
                          value={(product.stock / product.threshold) * 100} 
                          className={product.stock < 5 ? "text-red-500" : "text-amber-500"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Inventory</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +7.3%
                  </span>{" "}
                  from last week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$78.92</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 inline-flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +2.5%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-amber-500 inline-flex items-center">
                    <Clock className="mr-1 h-4 w-4" /> 5 urgent
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 inline-flex items-center">
                    <Clock className="mr-1 h-4 w-4" /> 3 unassigned
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Content</CardTitle>
              <CardDescription>
                Detailed analytics will be displayed here.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border rounded-md">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed analytics content will be implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Content</CardTitle>
              <CardDescription>
                Generate and view reports here.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border rounded-md">
              <div className="text-center">
                <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Reports Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed reports content will be implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications Content</CardTitle>
              <CardDescription>
                View and manage your notifications here.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border rounded-md">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Notifications Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Notification management will be implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </SidebarProvider>
  )
}
