from database import db

class Stat(db.Model):
    __tablename__ = "global_stat"

    id_stat = db.Column(db.Integer, primary_key=True)
    dimension = db.Column(db.String(255))
    sous_dimension = db.Column(db.String(255))
    valeur_sous_dimension = db.Column(db.String(255))
    total_siret = db.Column(db.Float)
    delta_effectif_total = db.Column(db.Float)
    delta_effectif_percent_mean = db.Column(db.Float)
    
    def __init__(self, dimension, sous_dimension, valeur_sous_dimension, total_siret, delta_effectif_total, delta_effectif_percent_mean):

        self.dimension = dimension
        self.sous_dimension = sous_dimension
        self.valeur_sous_dimension = valeur_sous_dimension
        self.total_siret = total_siret
        self.delta_effectif_total = delta_effectif_total
        self.delta_effectif_percent_mean = delta_effectif_percent_mean
    
    def __repr__(self):
        return '%s/%s/%s/%s/%s/%s' % (self.dimension, self.sous_dimension, self.valeur_sous_dimension,self.total_siret, self.delta_effectif_total, self.delta_effectif_percent_mean)

