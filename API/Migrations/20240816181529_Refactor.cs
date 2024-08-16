using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Refactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectShortcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectStartDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectEndDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.ProjectID);
                });

            migrationBuilder.CreateTable(
                name: "ProjectPhase",
                columns: table => new
                {
                    ProjectPhaseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectPhaseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectPhaseDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectPhaseStartDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectPhaseEndDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectPhaseStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectPhaseOrder = table.Column<int>(type: "int", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectPhase", x => x.ProjectPhaseID);
                    table.ForeignKey(
                        name: "FK_ProjectPhase_Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Project",
                        principalColumn: "ProjectID");
                });

            migrationBuilder.CreateTable(
                name: "ProjectTeam",
                columns: table => new
                {
                    ProjectTeamID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectID = table.Column<int>(type: "int", nullable: true),
                    AppUserID = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTeam", x => x.ProjectTeamID);
                    table.ForeignKey(
                        name: "FK_ProjectTeam_AspNetUsers_AppUserID",
                        column: x => x.AppUserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProjectTeam_Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Project",
                        principalColumn: "ProjectID");
                });

            migrationBuilder.CreateTable(
                name: "ProjectTasks",
                columns: table => new
                {
                    ProjectTasksID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectTasksName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectTasksDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectTasksStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectTasksStartDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectTasksEndDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: true),
                    ProjectPhaseID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTasks", x => x.ProjectTasksID);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_ProjectPhase_ProjectPhaseID",
                        column: x => x.ProjectPhaseID,
                        principalTable: "ProjectPhase",
                        principalColumn: "ProjectPhaseID");
                    table.ForeignKey(
                        name: "FK_ProjectTasks_Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Project",
                        principalColumn: "ProjectID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectPhase_ProjectID",
                table: "ProjectPhase",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectID",
                table: "ProjectTasks",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectPhaseID",
                table: "ProjectTasks",
                column: "ProjectPhaseID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeam_AppUserID",
                table: "ProjectTeam",
                column: "AppUserID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeam_ProjectID",
                table: "ProjectTeam",
                column: "ProjectID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "ProjectTeam");

            migrationBuilder.DropTable(
                name: "ProjectPhase");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
