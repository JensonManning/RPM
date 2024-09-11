using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class extras : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectEvents",
                columns: table => new
                {
                    ProjectEventsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectEventsName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectEventsDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectEventsDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectEventsDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectEventsTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectEventsStartDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectEventsEndDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectEventsStartTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectEventsEndTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectEvents", x => x.ProjectEventsID);
                    table.ForeignKey(
                        name: "FK_ProjectEvents_Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Project",
                        principalColumn: "ProjectID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectNotebookCategory",
                columns: table => new
                {
                    ProjectNotebookCategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectNotebookCategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectNotebookCategoryDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectNotebookCategory", x => x.ProjectNotebookCategoryID);
                });

            migrationBuilder.CreateTable(
                name: "AppUserProjectEvents",
                columns: table => new
                {
                    AppUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectEventsID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserProjectEvents", x => new { x.AppUsersId, x.ProjectEventsID });
                    table.ForeignKey(
                        name: "FK_AppUserProjectEvents_AspNetUsers_AppUsersId",
                        column: x => x.AppUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserProjectEvents_ProjectEvents_ProjectEventsID",
                        column: x => x.ProjectEventsID,
                        principalTable: "ProjectEvents",
                        principalColumn: "ProjectEventsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectNotebooks",
                columns: table => new
                {
                    ProjectNotebooksID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectNotebooksName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectNotebooksDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectNotebooksDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false),
                    ProjectNotebookCategoryID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectNotebooks", x => x.ProjectNotebooksID);
                    table.ForeignKey(
                        name: "FK_ProjectNotebooks_ProjectNotebookCategory_ProjectNotebookCategoryID",
                        column: x => x.ProjectNotebookCategoryID,
                        principalTable: "ProjectNotebookCategory",
                        principalColumn: "ProjectNotebookCategoryID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectNotebooks_Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Project",
                        principalColumn: "ProjectID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserProjectEvents_ProjectEventsID",
                table: "AppUserProjectEvents",
                column: "ProjectEventsID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectEvents_ProjectID",
                table: "ProjectEvents",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectNotebooks_ProjectID",
                table: "ProjectNotebooks",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectNotebooks_ProjectNotebookCategoryID",
                table: "ProjectNotebooks",
                column: "ProjectNotebookCategoryID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserProjectEvents");

            migrationBuilder.DropTable(
                name: "ProjectNotebooks");

            migrationBuilder.DropTable(
                name: "ProjectEvents");

            migrationBuilder.DropTable(
                name: "ProjectNotebookCategory");
        }
    }
}
