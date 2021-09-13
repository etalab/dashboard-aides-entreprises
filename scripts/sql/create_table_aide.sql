CREATE TABLE aide
(
	id_aide SERIAL PRIMARY KEY NOT NULL,
    code_application CHARACTER VARYING,
    numero_sequentiel CHARACTER VARYING,
    mois CHARACTER VARYING,
    siren CHARACTER VARYING,
    nom1 CHARACTER VARYING,
    nom2 CHARACTER VARYING,
    effectif DECIMAL(15,2),
    montant DECIMAL(15,2),
    devise CHARACTER VARYING,
    date_dp date default NULL,
    date_paiement date default NULL,
    siret CHARACTER VARYING,
    reg CHARACTER VARYING,
    dep CHARACTER VARYING,
    codeCommuneEtablissement CHARACTER VARYING,
    activiteprincipaleetablissement CHARACTER VARYING,
    count_siren_nb DECIMAL(15,2),
    montant_modifie DECIMAL(15,2),
    delta_effectif DECIMAL(15,2),
    delta_effectif_percent DECIMAL(15,2),
    classe_effectif CHARACTER VARYING,
    categoriejuridiqueunitelegale CHARACTER VARYING
)
TABLESPACE pg_default;
