﻿// <auto-generated />
using System;
using EnvioBack.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EnvioBack.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20230326154212_pred1")]
    partial class pred1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.3");

            modelBuilder.Entity("EnvioBack.Entities.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("EnvioBack.Entities.Adresses", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("County")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Lat")
                        .HasColumnType("REAL");

                    b.Property<double>("Lon")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("adresses");
                });

            modelBuilder.Entity("EnvioBack.Entities.Devices", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AdresseId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ProsummerId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AdresseId");

                    b.HasIndex("ProsummerId");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("EnvioBack.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("EnvioBack.Entities.Predictions", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DeviceId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("ProducedPrediction")
                        .HasColumnType("REAL");

                    b.Property<double>("UsagePrediction")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("date")
                        .HasColumnType("Date");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.ToTable("Predictions");
                });

            modelBuilder.Entity("EnvioBack.Entities.Prosummer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AdresseId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("BrLK")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("IsBlock")
                        .HasColumnType("INTEGER");

                    b.Property<int>("IsFirstTimeLogged")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Jbmg")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AdresseId");

                    b.HasIndex("UserId");

                    b.ToTable("Prosummers");
                });

            modelBuilder.Entity("EnvioBack.Entities.Records", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DeviceId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Produced")
                        .HasColumnType("REAL");

                    b.Property<double>("Usage")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("date")
                        .HasColumnType("Date");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId");

                    b.ToTable("Records");
                });

            modelBuilder.Entity("EnvioBack.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EnvioBack.Entities.UserPass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UsersPass");
                });

            modelBuilder.Entity("EnvioBack.Entities.Admin", b =>
                {
                    b.HasOne("EnvioBack.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnvioBack.Entities.Devices", b =>
                {
                    b.HasOne("EnvioBack.Entities.Adresses", "Adresse")
                        .WithMany()
                        .HasForeignKey("AdresseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EnvioBack.Entities.Prosummer", "Prosummer")
                        .WithMany()
                        .HasForeignKey("ProsummerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Adresse");

                    b.Navigation("Prosummer");
                });

            modelBuilder.Entity("EnvioBack.Entities.Image", b =>
                {
                    b.HasOne("EnvioBack.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnvioBack.Entities.Predictions", b =>
                {
                    b.HasOne("EnvioBack.Entities.Devices", "Device")
                        .WithMany()
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Device");
                });

            modelBuilder.Entity("EnvioBack.Entities.Prosummer", b =>
                {
                    b.HasOne("EnvioBack.Entities.Adresses", "Adresse")
                        .WithMany()
                        .HasForeignKey("AdresseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EnvioBack.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Adresse");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnvioBack.Entities.Records", b =>
                {
                    b.HasOne("EnvioBack.Entities.Devices", "Device")
                        .WithMany()
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Device");
                });

            modelBuilder.Entity("EnvioBack.Entities.UserPass", b =>
                {
                    b.HasOne("EnvioBack.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
