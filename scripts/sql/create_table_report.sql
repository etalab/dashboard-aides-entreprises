CREATE TABLE report
(
	id_report SERIAL PRIMARY KEY NOT NULL,
    nombre DECIMAL(9,2),
    montant DECIMAL(15,2),
    dep CHARACTER VARYING,
    reg CHARACTER VARYING,
    date_mesures date default NULL
)
TABLESPACE pg_default;