from database import db

class Aide(db.Model):
    __tablename__ = "aide"

    id_aide = db.Column(db.Integer, primary_key=True)
    code_application = db.Column(db.String(255))
    numero_sequentiel = db.Column(db.String(255))
    mois = db.Column(db.String(255))
    siren = db.Column(db.String(255))
    nom1 = db.Column(db.String(255))
    nom2 = db.Column(db.String(255))
    effectif = db.Column(db.Float)
    montant = db.Column(db.Float)
    devise = db.Column(db.String(255))
    date_dp = db.Column(db.Date)
    date_paiement = db.Column(db.Date)
    siret = db.Column(db.String(255))
    reg = db.Column(db.Float)
    dep = db.Column(db.String(255))
    codecommuneetablissementstring = db.Column(db.String(255))
    count_siren_nb = db.Column(db.Float)
    montant_modifie = db.Column(db.Float)

    def __init__(self, code_application, numero_sequentiel, mois, siren, nom1, nom2, effectif, montant, devise, date_dp, date_paiement, siret, reg, dep, codecommuneetablissementstring, count_siren_nb, montant_modifie):

        self.code_application = code_application
        self.numero_sequentiel = numero_sequentiel
        self.mois = mois
        self.siren = siren
        self.nom1 = nom1
        self.nom2 = nom2
        self.effectif = effectif
        self.montant = montant
        self.devise = devise
        self.date_dp = date_dp
        self.date_paiement = date_paiement
        self.siret = siret
        self.reg = reg
        self.dep = dep
        self.codecommuneetablissementstring = codecommuneetablissementstring
        self.count_siren_nb = count_siren_nb
        self.montant_modifie = montant_modifie
    
    def __repr__(self):
        return '%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s' % (self.code_application, self.numero_sequentiel, self.mois, self.siren, self.nom1, self.nom2, self.effectif, self.montant, self.devise, self.date_dp, self.date_paiement, self.siret, self.reg, self.dep, self.codecommuneetablissementstring, self.count_siren_nb, self.montant_modifie)

