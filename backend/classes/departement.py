from database import db

class Departement(db.Model):
    __tablename__ = "departement"

    id_departement = db.Column(db.Integer, primary_key=True)
    reg = db.Column(db.String(255))
    dep = db.Column(db.String(255))
    cheflieu = db.Column(db.String(255))
    tncc = db.Column(db.String(255))
    ncc = db.Column(db.String(255))
    nccenr = db.Column(db.String(255))
    libelle = db.Column(db.String(255))

    def __init__(self, dep, reg, cheflieu, tncc, ncc, nccenr, libelle):

        self.dep = dep
        self.reg = reg
        self.cheflieu = cheflieu
        self.tncc = tncc
        self.ncc = ncc
        self.nccenr = nccenr
        self.libelle = libelle
    
    def __repr__(self):
        return '%s/%s/%s/%s/%s/%s/%s' % (self.dep, self.reg, self.cheflieu, self.tncc,self.ncc, self.nccenr, self.libelle)

