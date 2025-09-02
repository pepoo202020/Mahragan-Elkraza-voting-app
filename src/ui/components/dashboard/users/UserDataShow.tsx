import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageType, TranslationKeys } from "@/ui/contexts/LanguageContext";
import {
  IArtworksWithVotes,
  ITableHeadRow,
  IUsersWithVotesAndComments,
} from "@/ui/types/types";
import { ImageIcon, Loader2 } from "lucide-react";
import { Avatar_C } from "../../shared/Avatar_C";
import { Badge } from "@/components/ui/badge";
import SharedDropdownMenu from "../../shared/SharedDropdownMenu";
import { Eye, Edit, Trash2 } from "lucide-react";
import DataShow from "../DataShow";

interface IUserDataShowProps {
  t: (key: TranslationKeys) => string;
  filteredUsers: IUsersWithVotesAndComments[];
  isLoading: boolean;
  handleViewUserDetails: (value: string) => void;
  handleEditUser: (value: string) => void;
  handleDeleteUser: (value: IUsersWithVotesAndComments) => void;
  handlePromoteToAdmin: (value: string) => void;
  language: LanguageType;
}

export default function UserDataShow({
  t,
  filteredUsers,
  isLoading,
  handleViewUserDetails,
  handleEditUser,
  handleDeleteUser,
  language,
  handlePromoteToAdmin,
}: IUserDataShowProps) {
  const userTableHeadRows: ITableHeadRow[] = [
    { title: t("image"), className: "w-[60px] align-middle" },
    { title: t("name"), className: "align-middle" },
    { title: t("email"), className: "align-middle" },
    { title: t("role"), className: "align-middle" },
    { title: t("votes"), className: "align-middle" },
    { title: t("comments"), className: "align-middle" },
    { title: t("actions"), className: "w-[80px] align-middle" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          {t("users")} ({filteredUsers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              {t("loadingUsers")}
            </span>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="rounded-md border">
            <DataShow<IUsersWithVotesAndComments>
              language={language}
              headRows={userTableHeadRows}
              data={filteredUsers}
              keyExtractor={(user) => user.id}
              renderCells={(user) => [
                <div key="image" className="flex items-center justify-center">
                  <Avatar_C image={user.image!} name={user.name} table />
                </div>,
                <div key="name" className="font-medium">
                  {user.name}
                </div>,
                <div key="email" className="align-middle">
                  {user.email}
                </div>,
                <div key="role" className="align-middle">
                  {user.role}
                </div>,
                <Badge key="votes" variant="outline" className="align-middle">
                  {user.votes.length}
                </Badge>,
                <span key="comments" className="font-mono align-middle">
                  {user.comments.length}
                </span>,
              ]}
              renderActions={(artwork) => (
                <div className="flex justify-center">
                  <SharedDropdownMenu
                    menuItems={[
                      {
                        label: t("promoteToAdmin"),
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => handlePromoteToAdmin(artwork.id),
                      },
                      {
                        label: t("viewDetails"),
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => handleViewUserDetails(artwork.id),
                      },

                      {
                        label: t("edit"),
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => handleEditUser(artwork.id),
                      },
                      {
                        label: t("delete"),
                        icon: <Trash2 className="h-4 w-4" />,
                        className: "text-destructive",
                        onClick: () => handleDeleteUser(artwork),
                      },
                    ]}
                  />
                </div>
              )}
            />
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            {t("noArtworksFound")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
