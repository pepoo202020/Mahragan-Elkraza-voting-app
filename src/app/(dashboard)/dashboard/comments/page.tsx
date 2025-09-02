"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import {
  Check,
  Clock,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
export default function CommentsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const comments = [
    {
      id: 1,
      content:
        "This artwork beautifully captures the essence of the Last Supper. The attention to detail is remarkable.",
      author: "Sarah Johnson",
      authorEmail: "sarah@email.com",
      artwork: "The Last Supper Replica",
      status: "approved",
      createdAt: "2024-02-01T10:30:00Z",
      avatar: "/placeholder.svg",
      flagged: false,
    },
    {
      id: 2,
      content:
        "I love the peaceful atmosphere in this garden scene. It really speaks to my soul.",
      author: "Michael Brown",
      authorEmail: "michael@email.com",
      artwork: "Garden of Gethsemane",
      status: "pending",
      createdAt: "2024-02-01T09:15:00Z",
      avatar: "/placeholder.svg",
      flagged: false,
    },
    {
      id: 3,
      content:
        "This is inappropriate content that should not be displayed here.",
      author: "Anonymous User",
      authorEmail: "anon@email.com",
      artwork: "Nativity Scene",
      status: "flagged",
      createdAt: "2024-01-31T16:45:00Z",
      avatar: "/placeholder.svg",
      flagged: true,
    },
    {
      id: 4,
      content:
        "The colors and composition in this piece are absolutely stunning. Great work!",
      author: "Emma Davis",
      authorEmail: "emma@email.com",
      artwork: "Angels Chorus",
      status: "approved",
      createdAt: "2024-01-31T14:20:00Z",
      avatar: "/placeholder.svg",
      flagged: false,
    },
    {
      id: 5,
      content:
        "Not sure about this one. Could use more explanation about the artistic choices.",
      author: "David Wilson",
      authorEmail: "david@email.com",
      artwork: "Resurrection Morning",
      status: "pending",
      createdAt: "2024-01-31T11:30:00Z",
      avatar: "/placeholder.svg",
      flagged: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">Approved</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      case "rejected":
        return <Badge variant="secondary">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.artwork.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Total Comments",
      value: comments.length,
      icon: MessageCircle,
      color: "text-blue-600",
    },
    {
      label: "Pending Review",
      value: comments.filter((c) => c.status === "pending").length,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      label: "Approved",
      value: comments.filter((c) => c.status === "approved").length,
      icon: Check,
      color: "text-green-600",
    },
    {
      label: "Flagged",
      value: comments.filter((c) => c.status === "flagged").length,
      icon: Flag,
      color: "text-red-600",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <main
      className="flex-1 p-6 animate-fade-in"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Comments Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Moderate and manage user comments on artworks
          </p>
        </div>
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search comments, authors, or artworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {/* Comments List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Comments ({filteredComments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors"
              >
                {/* Comment Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{comment.author}</p>
                        {comment.flagged && (
                          <Flag className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        on{" "}
                        <span className="font-medium">{comment.artwork}</span> •{" "}
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(comment.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {comment.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Flag as Inappropriate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <X className="mr-2 h-4 w-4" />
                          Delete Comment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Comment Content */}
                <div className="pl-11">
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                </div>

                {/* Quick Actions for Pending Comments */}
                {comment.status === "pending" && (
                  <div className="pl-11 flex gap-2">
                    <Button size="sm" variant="default" className="h-8">
                      <Check className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <X className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
