from .models import *

def read_all(who):
    query = who.query.all()
    print(query)

def delete_all(who):
    who.query.delete()     
    db.session.commit()