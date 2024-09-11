using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class removetaskactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectTaskActions",
                table: "ProjectTasks");

            migrationBuilder.RenameColumn(
                name: "ProjectTaskStatusEnum",
                table: "ProjectTasks",
                newName: "ProjectTaskStatusEnumC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjectTaskStatusEnumC",
                table: "ProjectTasks",
                newName: "ProjectTaskStatusEnum");

            migrationBuilder.AddColumn<int>(
                name: "ProjectTaskActions",
                table: "ProjectTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
