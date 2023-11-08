using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnvioBack.Migrations
{
    /// <inheritdoc />
    public partial class pred1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Predictions_DeviceId",
                table: "Predictions",
                column: "DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Predictions_Devices_DeviceId",
                table: "Predictions",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Predictions_Devices_DeviceId",
                table: "Predictions");

            migrationBuilder.DropIndex(
                name: "IX_Predictions_DeviceId",
                table: "Predictions");
        }
    }
}
