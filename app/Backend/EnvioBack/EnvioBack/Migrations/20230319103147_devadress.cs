using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnvioBack.Migrations
{
    /// <inheritdoc />
    public partial class devadress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "adresses",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Lon",
                table: "adresses",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "adresses");

            migrationBuilder.DropColumn(
                name: "Lon",
                table: "adresses");
        }
    }
}
