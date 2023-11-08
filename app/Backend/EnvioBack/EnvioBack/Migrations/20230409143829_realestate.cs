using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnvioBack.Migrations
{
    /// <inheritdoc />
    public partial class realestate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_adresses_AdresseId",
                table: "Devices");

            migrationBuilder.RenameColumn(
                name: "AdresseId",
                table: "Devices",
                newName: "RealEstateId");

            migrationBuilder.RenameIndex(
                name: "IX_Devices_AdresseId",
                table: "Devices",
                newName: "IX_Devices_RealEstateId");

            migrationBuilder.CreateTable(
                name: "RealEstates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    AdresseId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProsummerId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealEstates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealEstates_Prosummers_ProsummerId",
                        column: x => x.ProsummerId,
                        principalTable: "Prosummers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RealEstates_adresses_AdresseId",
                        column: x => x.AdresseId,
                        principalTable: "adresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RealEstates_AdresseId",
                table: "RealEstates",
                column: "AdresseId");

            migrationBuilder.CreateIndex(
                name: "IX_RealEstates_ProsummerId",
                table: "RealEstates",
                column: "ProsummerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_RealEstates_RealEstateId",
                table: "Devices",
                column: "RealEstateId",
                principalTable: "RealEstates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_RealEstates_RealEstateId",
                table: "Devices");

            migrationBuilder.DropTable(
                name: "RealEstates");

            migrationBuilder.RenameColumn(
                name: "RealEstateId",
                table: "Devices",
                newName: "AdresseId");

            migrationBuilder.RenameIndex(
                name: "IX_Devices_RealEstateId",
                table: "Devices",
                newName: "IX_Devices_AdresseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_adresses_AdresseId",
                table: "Devices",
                column: "AdresseId",
                principalTable: "adresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
