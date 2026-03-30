using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Planify.API.Migrations
{
    /// <inheritdoc />
    public partial class EventUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "user_id",
                table: "events",
                type: "text",
                nullable: true
                );

            migrationBuilder.Sql(@"
                UPDATE events
                SET user_id = '9b340d87-21dc-48ad-ad54-c5714bda5808'
                WHERE user_id IS NULL;
            ");

            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "events",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_events_user_id",
                table: "events",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_events_users_user_id",
                table: "events",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_events_users_user_id",
                table: "events");

            migrationBuilder.DropIndex(
                name: "ix_events_user_id",
                table: "events");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "events");
        }
    }
}
