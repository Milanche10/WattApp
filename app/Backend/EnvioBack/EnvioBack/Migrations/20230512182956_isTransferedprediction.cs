using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnvioBack.Migrations
{
    /// <inheritdoc />
    public partial class isTransferedprediction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsTransfered",
                table: "Predictions",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTransfered",
                table: "Predictions");
        }
    }
}
