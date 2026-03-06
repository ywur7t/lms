from .models import *
import csv

def upload_sports():
    with open('app/data/sports_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Sports(row[0], row[1])
            db.session.add(new_entry)
        db.session.commit()

def upload_medals():
    with open('app/data/medals_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Medals(row[0], row[1])
            db.session.add(new_entry)
        db.session.commit()

def upload_games():
    with open('app/data/games_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Games(row[0], row[1], row[2], row[3])
            db.session.add(new_entry)
        db.session.commit()

def upload_countries():
    with open('app/data/countries_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Countries(row[0], row[1], row[2], row[3], row[4]) 
            db.session.add(new_entry)
        db.session.commit()

def upload_coaches():
    with open('app/data/coaches_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Coaches(row[0], row[1]) 
            db.session.add(new_entry)
        db.session.commit()

def upload_events():
    with open('app/data/events_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Events(row[0], row[1], row[2]) 
            db.session.add(new_entry)
        db.session.commit()

def upload_athletes():
    with open('app/data/athletes_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Athletes(row[0], row[1], row[2], datetime.strptime(row[3], "%Y-%m-%d"), row[4], row[5], row[6])
            db.session.add(new_entry)
        db.session.commit()

def upload_athlete_participation():
    with open('app/data/athlete_participation_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = Athlete_Participations(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9])
            db.session.add(new_entry)
        db.session.commit()

def upload_events_sports():
    with open('app/data/events_sports_dataset.csv') as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            new_entry = EventsSports(row[0], row[1])
            db.session.add(new_entry)
        db.session.commit()