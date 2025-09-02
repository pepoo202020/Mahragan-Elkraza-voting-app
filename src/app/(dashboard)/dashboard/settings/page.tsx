"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import {
  Bell,
  Calendar,
  Database,
  Download,
  Palette,
  Shield,
} from "lucide-react";

// ✅ Eventually we’ll fetch & save this via Prisma API routes
export default function SettingsPage() {
  const { language } = useLanguage();

  // ✅ Local state (will later be replaced with react-hook-form or Prisma fetch)
  const [festivalYear, setFestivalYear] = useState("2024");
  const [festivalTheme, setFestivalTheme] = useState("");
  const [festivalDescription, setFestivalDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [churchName, setChurchName] = useState("St. Mary’s Church");
  const [galleryTitle, setGalleryTitle] = useState("Sacred Art Gallery");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // ✅ Handlers for Save Buttons (future API integration)
  const handleSaveFestival = () => {
    console.log({
      festivalYear,
      festivalTheme,
      festivalDescription,
      startDate,
      endDate,
    });
    // TODO: send this to backend (via /api/settings)
  };

  const handleSaveAppearance = () => {
    console.log({ churchName, galleryTitle, welcomeMessage });
    // TODO: send this to backend
  };

  return (
    <main
      className="flex-1 p-6 animate-fade-in"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="space-y-6">
        {/* ✅ Header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            {language === "en" ? "Settings" : "الإعدادات"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {language === "en"
              ? "Manage your church art gallery system settings"
              : "إدارة إعدادات نظام معرض الفن الكنسي"}
          </p>
        </div>

        {/* ✅ Festival Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Festival Settings
            </CardTitle>
            <CardDescription>
              Configure the current art festival
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="festival-year">Festival Year</Label>
                <Input
                  id="festival-year"
                  value={festivalYear}
                  onChange={(e) => setFestivalYear(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="festival-theme">Festival Theme</Label>
                <Input
                  id="festival-theme"
                  value={festivalTheme}
                  onChange={(e) => setFestivalTheme(e.target.value)}
                  placeholder="Faith Through Art"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="festival-description">Festival Description</Label>
              <Textarea
                id="festival-description"
                value={festivalDescription}
                onChange={(e) => setFestivalDescription(e.target.value)}
                placeholder="Describe this year's art festival theme and goals..."
                className="min-h-[80px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Voting Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">Voting End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleSaveFestival}>Save Festival Settings</Button>
          </CardContent>
        </Card>

        {/* ✅ Appearance & Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance & Branding
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your gallery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="church-name">Church Name</Label>
                <Input
                  id="church-name"
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gallery-title">Gallery Title</Label>
                <Input
                  id="gallery-title"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Textarea
                id="welcome-message"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                placeholder="Welcome to our church art gallery..."
                className="min-h-[80px]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" />
                <Label htmlFor="dark-mode">Enable Dark Mode by Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-artist-names" defaultChecked />
                <Label htmlFor="show-artist-names">
                  Show Artist Names on Gallery
                </Label>
              </div>
            </div>

            <Button onClick={handleSaveAppearance}>
              Save Appearance Settings
            </Button>
          </CardContent>
        </Card>

        {/* ✅ باقي الكروت زي ما هي (Permissions, Notifications, Data Management) */}
        {/* 🔜 نقدر نربطهم بـ API بعدين زي ما عملنا مع Festival & Appearance */}
      </div>
    </main>
  );
}
