from .models import Country, City, Building, TypeBuilding
from .extensions import db
from sqlalchemy import func

def query():

   # result = db.session.query(TypeBuilding).all()
   result = db.session.query(
      Building.title.label("Здание"),
      Building.year.label("Год"),
      Building.height.label("Высота")
   ) \
      .filter(Building.height > 500, Building.height < 700, Building.title.contains("башня")) \
      .order_by("Год", Building.height.desc()) \
      .join(City) \
      .all()

   print(result)
