ALTER TABLE contacts.individual ADD jwt_is_active BOOLEAN DEFAULT BOOLEAN;
ALTER TABLE contacts.individual ADD jwt_key_word varchar(20) NULL;

ALTER TABLE contacts.individual ADD jwt_creation_date TIMESTAMP NULL;
ALTER TABLE contacts.individual ADD jwt_validity_duration INT NULL;

