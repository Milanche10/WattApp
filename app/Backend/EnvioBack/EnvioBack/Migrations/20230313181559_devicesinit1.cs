using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnvioBack.Migrations
{
    /// <inheritdoc />
    public partial class devicesinit1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Usage",
                table: "Devices");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Devices");

            migrationBuilder.AddColumn<double>(
                name: "Usage",
                table: "Devices",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
