from .models import TypeBuilding, Building, City, Country
from .extensions import db

def create():
    
    item = TypeBuilding('Бетонная башня')
    db.session.add(item)

    item = TypeBuilding('Радиомачта')
    db.session.add(item)

    item = TypeBuilding('Гиперболоидная башня')
    db.session.add(item)

    item = TypeBuilding('Дымовая труба')
    db.session.add(item)

    item = TypeBuilding('Решётчатая мачта')
    db.session.add(item)

    item = TypeBuilding('Башня')
    db.session.add(item)
    
    item = TypeBuilding('Мост')
    db.session.add(item)
    
    db.session.commit()

def read():
    query = TypeBuilding.query.all()
    print(query)

def update():
    (TypeBuilding.query.filter(TypeBuilding.type == 'Мост')
     .update({TypeBuilding.type: "Мосты"}))
    db.session.commit()
    query = TypeBuilding.query.all()
    print(query)

def delete():
    TypeBuilding.query.delete()
    Building.query.delete()
    City.query.delete()
    Country.query.delete()
     
    db.session.commit()

    query = TypeBuilding.query.all()
    print(query)
    