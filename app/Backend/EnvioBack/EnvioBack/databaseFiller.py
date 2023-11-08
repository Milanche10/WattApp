import datetime
import pandas as pa
import numpy as np
import random
import sqlite3
from sqlite3 import Error
import os
import os.path
from geopy.geocoders import Nominatim
import string
import time
import names
from geopy import distance
from datetime import date, timedelta
import calendar



def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_user(conn, user):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO Users(FirstName,LastName,Email)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, user)
    conn.commit()
    return cur.lastrowid


def create_user_pass(conn, user):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO UsersPass(UserId,PasswordHash,PasswordSalt)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, user)
    conn.commit()
    return cur.lastrowid


def create_prosummer(conn, prosummer):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO Prosummers(UserId,Jbmg,BrLK,AdresseId,IsBlock,IsFirstTimeLogged)
              VALUES(?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, prosummer)
    conn.commit()
    return cur.lastrowid


def create_adresses(conn, adresse):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO adresses(Address,City,County,Lat,Lon)
              VALUES(?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, adresse)
    conn.commit()
    return cur.lastrowid


def create_device(conn, device):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO Devices(Name,ProsummerId,RealEstateId,Status,Type,isAccesable,isVisible,Manufacturer,Description)
              VALUES(?,?,?,?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, device)
    conn.commit()
    return cur.lastrowid

def create_records(conn, record):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO Records(date,Usage,DeviceId,Produced)
              VALUES(?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, record)
    conn.commit()
    return cur.lastrowid

def create_predictions(conn, record):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO Predictions(DeviceId,ProducedPrediction,UsagePrediction,date,isTransfered)
              VALUES(?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, record)
    conn.commit()
    return cur.lastrowid

def create_realestate(conn, realestate):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO RealEstates(Type,AdresseId,ProsummerId)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, realestate)
    conn.commit()
    return cur.lastrowid

def create_userpass(conn,userpass):
    """
    Create a new task
    :param conn:
    :param task:
    :return:
    """

    sql = ''' INSERT INTO UsersPass(UserId,PasswordHash,PasswordSalt)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, userpass)
    conn.commit()
    return cur.lastrowid


def insert_realestate(conn,prosummerId,adresseId):
    types = ["Kuca","Apartman","Vikendica"]
    type = types[random.randint(0,len(types)-1)]
    realestate = (type,adresseId,prosummerId)
    create_realestate(conn,realestate)


def insert_adresse(conn):
    #Insert into adresse
    serbia_location = "Serbia"
    max_distance = 500
    #location = geolocator.geocode(serbia_location)
    #serbia_lat = location.latitude
    #serbia_lon = location.longitude
    #serbia_box = distance.distance(kilometers=max_distance).destination((serbia_lat, serbia_lon), 45)
    #lat = random.uniform(serbia_lat, serbia_box.latitude)
    #lon = random.uniform(serbia_lon, serbia_box.longitude)
    lat = round(random.uniform(43.1, 45.4), 6)
    lon = round(random.uniform(19.2, 22.3), 6)
    #Get adresse by cordinates
    str1 = str(lat)+","+str(lon)
    location = geolocator.reverse(str1)
    #print(location.address + "\n\n")
    adresseDetails = location.address.split(',')
    street = adresseDetails[0]
    city = adresseDetails[1]
    county = ""
    for split in adresseDetails:
        #print(split)
        if("округ" in split.lower()):
            county = split
    county = adresseDetails[2]
    street = street.translate(tr)
    city = city.translate(tr)
    county = county.translate(tr)
    adresse = (street,city,county,lat,lon)
    create_adresses(conn,adresse)

def insert_user(conn):
    allmails = ["gmail","hotmail","yahoo","pmf.kg.ac.rs","outlook"]
    fullName = names.get_full_name().split(" ")
    firstName = fullName[0]
    lastName = fullName[1]
    email = firstName + lastName + str(random.randint(100, 999)) +"@" + allmails[random.randint(0, len(allmails) - 1)] + ".com"
    user = (firstName,lastName,email)
    create_user(conn,user)

def insert_prosummer(conn,userId,adresseId):
    jmbg = ""
    brlk = ""
    #adresseId = random.randint(1,basic_import)
    for i in range  (0,13):
        if i < 9:
            brlk += str(random.randint(0, 9))
        jmbg += str(random.randint(0, 9))
    prosummer = (userId,jmbg,brlk,adresseId,0,0)
    create_prosummer(conn,prosummer)

def insert_device(conn,prosummerId,realestateId,deviceId):
    description_phrases = [
    "High-performance device with advanced features.",
    "Sleek and stylish design for a modern look.",
    "Innovative technology for seamless user experience.",
    "Versatile device suitable for various applications.",
    "Enhanced functionality for improved productivity.",
    "Powerful performance that meets your demands.",
    "Elegant design crafted with precision and attention to detail.",
    "Cutting-edge technology at your fingertips.",
    "Unleash your creativity with this feature-rich device.",
    "Effortlessly stay connected wherever you go.",
    "Optimized for speed and efficiency.",
    "Immersive experience with stunning visuals and audio.",
    "Stay organized and productive with this smart device.",
    "Intuitive user interface for seamless navigation.",
    "Designed to exceed expectations in performance and reliability.",
    "Experience the future of technology with this device.",
    "Perfect balance of style, functionality, and performance.",
    "Unleash the full potential of your work and entertainment.",
    "Stay ahead of the curve with the latest innovations.",
    "Enhance your digital lifestyle with this exceptional device.",
    "Elevate your gaming experience to new heights.",
    "Stay entertained on the go with this portable device.",
    "Effortlessly capture and share your moments with this device.",
    "Experience true convenience and versatility.",
    "Immerse yourself in the world of virtual reality.",
    "Efficient and reliable device for your everyday tasks.",
    "Unleash your creativity and bring your ideas to life.",
    "Seamlessly connect and interact with the digital world.",
    "Designed for ultimate comfort and convenience.",
    ]
    description = description_phrases[random.randint(0, len(description_phrases) - 1)]
    types = ["Potrosac","Proizvodjac"]
    manufacturers = ["Gorenje", "Eko", "Hp", "Pavilon", "Toshiba", "Samsung"]
    type = types[random.randint(0, len(types) - 1)]
    manufacturer = manufacturers[random.randint(0, len(manufacturers) - 1)]
    isAccesable = 1
    isVisible = 1
    status = 0
    if(type == "Potrosac"):
        devicesPotrosac = ["TV","Laptop","PC","Kettle","Bulb","Microwave","Tumble Dryer","Owen","Air Conditioner"]
        deviceName = devicesPotrosac[random.randint(0, len(devicesPotrosac) - 1)]
    else:
        devicesProizvodjac = ["Solar panel","Generator","Windmill"]
        deviceName = devicesProizvodjac[random.randint(0, len(devicesProizvodjac) - 1)]
    device = (deviceName,prosummerId,realestateId,status,type,isAccesable,isVisible,manufacturer,description)
    create_device(conn,device)
    if(type == "Potrosac"):
        for j in range (0,250):
            insert_recordPotrosac(conn,deviceId)
            insert_predictionPotrosac(conn,deviceId)
    elif(type == "Proizvodjac"):
        for j in range(0,250):
            insert_recordProizvodjac(conn,deviceId)
            insert_predictionProizvodjac(conn,deviceId)
        

def insert_recordPotrosac(conn,deviceId):
    today = datetime.date.today()
    year_today = today.year
    month_today = today.month
    day_today = today.day
    start_date = datetime.date(2021, 1, 1)
    end_date = datetime.date(year_today, month_today, day_today)
    days_diff = (end_date - start_date).days
    random_date = start_date + datetime.timedelta(days=random.randint(0, days_diff))
    random_time = datetime.time(random.randint(0, 23), random.randint(0, 59), random.randint(0, 59))
    random_datetime = datetime.datetime.combine(random_date, random_time)

    usage = random.uniform(0.1, 7.5)
    produced = 0
    record = (random_datetime,usage,deviceId,produced)
    create_records(conn,record)

def insert_recordProizvodjac(conn,deviceId):
    today = datetime.date.today()
    year_today = today.year
    month_today = today.month
    day = 0
    today = datetime.date.today()
    year_today = today.year
    month_today = today.month
    day_today = today.day
    start_date = datetime.date(2021, 1, 1)
    end_date = datetime.date(year_today, month_today, day_today)
    days_diff = (end_date - start_date).days
    random_date = start_date + datetime.timedelta(days=random.randint(0, days_diff))
    random_time = datetime.time(random.randint(0, 23), random.randint(0, 59), random.randint(0, 59))
    random_datetime = datetime.datetime.combine(random_date, random_time)

    usage = 0
    produced = random.uniform(0.1, 7.5)
    record = (random_datetime,usage,deviceId,produced)
    create_records(conn,record)

def insert_predictionPotrosac(conn,deviceId):
    today = datetime.date.today() - timedelta(days=10)
    year_today = today.year
    month_today = today.month
    day_today = today.day
    start_date = datetime.date(year_today, month_today, day_today)
    end_date = datetime.date(2025, 12, 31)
    days_diff = (end_date - start_date).days
    random_date = start_date + datetime.timedelta(days=random.randint(0, days_diff))
    random_time = datetime.time(random.randint(0, 23), random.randint(0, 59), random.randint(0, 59))
    random_datetime = datetime.datetime.combine(random_date, random_time)

    usage = random.uniform(0.1, 8.5)
    produced = 0
    prediction = (deviceId,produced,usage,random_datetime,0)
    create_predictions(conn,prediction)

def insert_predictionProizvodjac(conn,deviceId):
    today = datetime.date.today() - timedelta(days=10)
    year_today = today.year
    month_today = today.month
    day_today = today.day
    start_date = datetime.date(year_today, month_today, day_today)
    end_date = datetime.date(2025, 12, 31)
    days_diff = (end_date - start_date).days
    random_date = start_date + datetime.timedelta(days=random.randint(0, days_diff))
    random_time = datetime.time(random.randint(0, 23), random.randint(0, 59), random.randint(0, 59))
    random_datetime = datetime.datetime.combine(random_date, random_time)

    usage = 0
    produced = random.uniform(0.1, 8.5)
    prediction = (deviceId,produced,usage,random_datetime,0)
    create_predictions(conn,prediction)


def main():

    cwd = os.path.abspath(__file__)
    #db_path = os.path.join(cwd, "envio.db")
    fileName = os.path.basename(cwd)
    db_path = cwd.replace(fileName,"envio.db")
    # create a database connection
    print("Inserting into database...")
    conn = create_connection(db_path)
    
    #time.sleep(5)
    for i in range (0,basic_import):
        insert_user(conn)
        insert_adresse(conn)
        insert_prosummer(conn,i+1,i+1)
        insert_realestate(conn,i+1,i+1)
        for j in range (0,3):
            insert_device(conn,i+1,i+1,i+1)

    print("You have succesefully filled your database")
        

            
        
    

    

    

if __name__ == '__main__':
    basic_import = 20
    geolocator = Nominatim(user_agent="envio")
    symbols = (u"абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ",
           u"abvgdđežzijkllmnnoprstćufhcčdšABVGDĐEŽZIJKLLMNNOPRSTĆUFHCČDŠ")

    tr = {ord(a):ord(b) for a, b in zip(*symbols)}
    main()
