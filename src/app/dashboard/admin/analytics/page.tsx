"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  Line,
  Pie,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingBag,
  CreditCard,
  Activity,
  TrendingUp,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

// Mock data for the dashboard
const salesData = [
  { month: "Jan", revenue: 4500, orders: 120, target: 4000 },
  { month: "Feb", revenue: 5200, orders: 145, target: 4500 },
  { month: "Mar", revenue: 4800, orders: 132, target: 4800 },
  { month: "Apr", revenue: 6000, orders: 160, target: 5000 },
  { month: "May", revenue: 5700, orders: 155, target: 5200 },
  { month: "Jun", revenue: 6500, orders: 175, target: 5500 },
  { month: "Jul", revenue: 7000, orders: 190, target: 6000 },
  { month: "Aug", revenue: 7200, orders: 195, target: 6200 },
  { month: "Sep", revenue: 6800, orders: 180, target: 6500 },
  { month: "Oct", revenue: 7500, orders: 200, target: 6800 },
  { month: "Nov", revenue: 8200, orders: 220, target: 7000 },
  { month: "Dec", revenue: 9500, orders: 250, target: 8000 },
];

const productPerformance = [
  { name: "Laptops", sales: 1200, revenue: 960000 },
  { name: "Smartphones", sales: 850, revenue: 637500 },
  { name: "Tablets", sales: 450, revenue: 225000 },
  { name: "Accessories", sales: 1800, revenue: 90000 },
  { name: "Monitors", sales: 320, revenue: 128000 },
];

const customerSegmentation = [
  { name: "New Customers", value: 35 },
  { name: "Returning", value: 45 },
  { name: "Loyal", value: 20 },
];

const trafficSources = [
  { name: "Direct", value: 30 },
  { name: "Organic Search", value: 25 },
  { name: "Paid Search", value: 15 },
  { name: "Social Media", value: 20 },
  { name: "Referral", value: 10 },
];

const orderStatusData = [
  { name: "Completed", value: 65 },
  { name: "Processing", value: 20 },
  { name: "Cancelled", value: 5 },
  { name: "Refunded", value: 10 },
];

const COLORS = ["#9c27b0", "#e53935", "#ff9800", "#607d8b", "#7a1f73"];

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("monthly");

  // Calculate KPIs
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  //   const conversionRate = 3.2 // Mock data

  // Calculate growth percentages
  const revenueGrowth = 12.5; // Mock data
  const ordersGrowth = 8.3; // Mock data
  const customersGrowth = 15.7; // Mock data
  const aovGrowth = 4.2; // Mock data

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#7a1f73] to-[#9c27b0] bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Get insights into your business performance and customer behavior
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {revenueGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">{revenueGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-red-500">
                      {Math.abs(revenueGrowth)}%
                    </span>
                  </>
                )}
                <span className="ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalOrders.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {ordersGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">{ordersGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-red-500">
                      {Math.abs(ordersGrowth)}%
                    </span>
                  </>
                )}
                <span className="ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {customersGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">{customersGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-red-500">
                      {Math.abs(customersGrowth)}%
                    </span>
                  </>
                )}
                <span className="ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Order Value
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${averageOrderValue.toFixed(2)}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {aovGrowth > 0 ? (
                  <>
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">{aovGrowth}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-red-500">{Math.abs(aovGrowth)}%</span>
                  </>
                )}
                <span className="ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gradient-to-r from-[#7a1f73] to-[#9c27b0] text-white">
            <TabsTrigger value="overview" className="flex items-center text-white data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center text-white data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center text-white data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center text-white data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Customers
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Revenue vs Target</CardTitle>
                  <CardDescription>
                    Monthly revenue compared to targets
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#9c27b0"
                        name="Revenue"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#e53935"
                        name="Target"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>
                    Distribution of orders by status
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#9c27b0"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    Where your customers are coming from
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#9c27b0"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {trafficSources.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>
                    Best performing products by revenue
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="revenue"
                        fill="#e53935"
                        name="Revenue ($)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trends</CardTitle>
                <CardDescription>
                  Monthly sales and order trends
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#9c27b0" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#e53935"
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#9c27b0"
                      name="Revenue ($)"
                      strokeWidth={3}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#e53935"
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>
                  Sales and revenue by product category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#9c27b0" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#82ca9d"
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="sales"
                      fill="#9c27b0"
                      name="Units Sold"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="revenue"
                      fill="#e53935"
                      name="Revenue ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segmentation</CardTitle>
                  <CardDescription>Breakdown of customer types</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegmentation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#9c27b0"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {customerSegmentation.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                  <CardDescription>
                    New customer acquisition over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: "Jan", customers: 120 },
                        { month: "Feb", customers: 145 },
                        { month: "Mar", customers: 162 },
                        { month: "Apr", customers: 190 },
                        { month: "May", customers: 210 },
                        { month: "Jun", customers: 252 },
                        { month: "Jul", customers: 265 },
                        { month: "Aug", customers: 280 },
                        { month: "Sep", customers: 305 },
                        { month: "Oct", customers: 340 },
                        { month: "Nov", customers: 360 },
                        { month: "Dec", customers: 390 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="customers"
                        stroke="#9c27b0"
                        fill="#9c27b0"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
