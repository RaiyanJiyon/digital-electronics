"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import {
  Activity,
  Cpu,
  HardDrive,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  AlarmClockCheck,
  Database,
  HardDriveDownload,
  TerminalSquare,
} from "lucide-react";

// Mock data
const systemInfo = {
  uptime: "14 days 06:27:11",
  status: "Operational",
  lastBackup: "2025-08-25 02:10",
  node: "prod-01",
  region: "us-west-1",
};

const resources = {
  cpu: 42,
  memory: 68,
  disk: 57,
  network: 23,
};

const services = [
  { name: "API Gateway", version: "2.4.1", status: "running", latency: "42 ms" },
  { name: "Auth Service", version: "1.8.3", status: "running", latency: "35 ms" },
  { name: "Orders Service", version: "3.1.0", status: "degraded", latency: "120 ms" },
  { name: "Payments", version: "2.2.5", status: "running", latency: "50 ms" },
  { name: "Notifications", version: "1.5.7", status: "stopped", latency: "-" },
];

const logs = [
  { time: "15:45:12", level: "info", source: "orders", message: "Queued order ORD-8123 for processing" },
  { time: "15:43:07", level: "warn", source: "payments", message: "Stripe latency above threshold" },
  { time: "15:40:54", level: "error", source: "notifications", message: "FCM token invalid for user 2943" },
  { time: "15:36:18", level: "info", source: "auth", message: "New session established for user 1022" },
  { time: "15:30:03", level: "info", source: "api", message: "Deployment completed (v2.4.1)" },
];

export default function SystemPage() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setRefreshing(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#7a1f73] to-[#9c27b0] bg-clip-text text-transparent">
                System
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50" onClick={onRefresh}>
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button className="bg-gradient-to-r from-[#e53935] to-[#ff0000] hover:from-[#d32f2f] hover:to-[#e53935]">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Run Diagnostics
              </Button>
            </div>
          </div>

          {/* System Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <AlarmClockCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.uptime}</div>
                <p className="text-xs text-muted-foreground">Node {systemInfo.node}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <ServerCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge className="bg-green-600">{systemInfo.status}</Badge>
                <p className="mt-2 text-xs text-muted-foreground">Region {systemInfo.region}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo.lastBackup}</div>
                <Button variant="outline" className="mt-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                  <HardDriveDownload className="mr-2 h-4 w-4" />
                  Restore
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts (24h)</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 critical • 2 warnings</p>
              </CardContent>
            </Card>
          </div>

          {/* Resource Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>Current node resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2"><Cpu className="h-4 w-4 text-muted-foreground" /><span>CPU</span></div>
                    <span className="text-sm font-medium">{resources.cpu}%</span>
                  </div>
                  <Progress value={resources.cpu} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2"><ServerCog className="h-4 w-4 text-muted-foreground" /><span>Memory</span></div>
                    <span className="text-sm font-medium">{resources.memory}%</span>
                  </div>
                  <Progress value={resources.memory} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2"><HardDrive className="h-4 w-4 text-muted-foreground" /><span>Disk</span></div>
                    <span className="text-sm font-medium">{resources.disk}%</span>
                  </div>
                  <Progress value={resources.disk} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2"><TerminalSquare className="h-4 w-4 text-muted-foreground" /><span>Network</span></div>
                    <span className="text-sm font-medium">{resources.network}%</span>
                  </div>
                  <Progress value={resources.network} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Status of core microservices</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Latency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((s) => (
                      <TableRow key={s.name}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>{s.version}</TableCell>
                        <TableCell>
                          {s.status === "running" && (
                            <Badge className="bg-green-600">Running</Badge>
                          )}
                          {s.status === "degraded" && (
                            <Badge className="bg-amber-500">Degraded</Badge>
                          )}
                          {s.status === "stopped" && (
                            <Badge className="bg-red-600">Stopped</Badge>
                          )}
                        </TableCell>
                        <TableCell>{s.latency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
              <CardDescription>Last 5 events across services</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="whitespace-nowrap">{log.time}</TableCell>
                      <TableCell>
                        {log.level === "info" && <Badge variant="secondary">info</Badge>}
                        {log.level === "warn" && <Badge className="bg-amber-500">warn</Badge>}
                        {log.level === "error" && <Badge className="bg-red-600">error</Badge>}
                      </TableCell>
                      <TableCell className="uppercase text-xs tracking-wide text-muted-foreground">{log.source}</TableCell>
                      <TableCell className="max-w-[600px] truncate">{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
