PGDMP  3    6                |            Autopro    16.2    16.2 r    N           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            O           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            P           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Q           1262    18145    Autopro    DATABASE     |   CREATE DATABASE "Autopro" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE "Autopro";
                postgres    false            �           1247    117421    etat_magasin_enum    TYPE     c   CREATE TYPE public.etat_magasin_enum AS ENUM (
    'Approuvé',
    'Rejeté',
    'En attente'
);
 $   DROP TYPE public.etat_magasin_enum;
       public          postgres    false            �            1259    83883    Adresse_Users    TABLE     �   CREATE TABLE public."Adresse_Users" (
    id_adr integer NOT NULL,
    code_adr integer NOT NULL,
    rue_adr character varying(255) NOT NULL,
    id_user integer,
    id_ville integer
);
 #   DROP TABLE public."Adresse_Users";
       public         heap    postgres    false            �            1259    83882    Adresse_Users_id_adr_seq    SEQUENCE     �   CREATE SEQUENCE public."Adresse_Users_id_adr_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Adresse_Users_id_adr_seq";
       public          postgres    false    236            R           0    0    Adresse_Users_id_adr_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."Adresse_Users_id_adr_seq" OWNED BY public."Adresse_Users".id_adr;
          public          postgres    false    235            �            1259    48972 	   Categorys    TABLE       CREATE TABLE public."Categorys" (
    id_cat integer NOT NULL,
    "Libelle_cat" character varying(255) NOT NULL,
    "Image_cat" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Categorys";
       public         heap    postgres    false            �            1259    48971    Categorys_id_cat_seq    SEQUENCE     �   CREATE SEQUENCE public."Categorys_id_cat_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Categorys_id_cat_seq";
       public          postgres    false    222            S           0    0    Categorys_id_cat_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Categorys_id_cat_seq" OWNED BY public."Categorys".id_cat;
          public          postgres    false    221            �            1259    153255    Chats    TABLE     �   CREATE TABLE public."Chats" (
    "id_Chat" integer NOT NULL,
    "Contenu" text NOT NULL,
    "Expediteur" integer NOT NULL,
    destinataire integer NOT NULL,
    "timestamp" timestamp with time zone
);
    DROP TABLE public."Chats";
       public         heap    postgres    false            �            1259    153254    Chats_id_Chat_seq    SEQUENCE     �   CREATE SEQUENCE public."Chats_id_Chat_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Chats_id_Chat_seq";
       public          postgres    false    242            T           0    0    Chats_id_Chat_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Chats_id_Chat_seq" OWNED BY public."Chats"."id_Chat";
          public          postgres    false    241            �            1259    104090    CommandeDetails    TABLE       CREATE TABLE public."CommandeDetails" (
    id_dtcmd integer NOT NULL,
    "Qte_dtcmd" integer NOT NULL,
    "id_MainCmd" integer NOT NULL,
    "prix_Total_dtcmd" double precision NOT NULL,
    id_cmd integer,
    id_prod integer,
    id_magasin integer
);
 %   DROP TABLE public."CommandeDetails";
       public         heap    postgres    false            �            1259    104089    CommandeDetails_id_dtcmd_seq    SEQUENCE     �   CREATE SEQUENCE public."CommandeDetails_id_dtcmd_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."CommandeDetails_id_dtcmd_seq";
       public          postgres    false    240            U           0    0    CommandeDetails_id_dtcmd_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."CommandeDetails_id_dtcmd_seq" OWNED BY public."CommandeDetails".id_dtcmd;
          public          postgres    false    239            �            1259    104070 	   Commandes    TABLE     v  CREATE TABLE public."Commandes" (
    id_cmd integer NOT NULL,
    "id_MainCmd" integer NOT NULL,
    prix_total double precision NOT NULL,
    "Reference_cmd" character varying(255) NOT NULL,
    etat_cmd character varying(255) DEFAULT 'en attente'::character varying NOT NULL,
    "Date_cmd" character varying(255) NOT NULL,
    id_user integer,
    id_magasin integer
);
    DROP TABLE public."Commandes";
       public         heap    postgres    false            �            1259    104069    Commandes_id_cmd_seq    SEQUENCE     �   CREATE SEQUENCE public."Commandes_id_cmd_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Commandes_id_cmd_seq";
       public          postgres    false    238            V           0    0    Commandes_id_cmd_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Commandes_id_cmd_seq" OWNED BY public."Commandes".id_cmd;
          public          postgres    false    237            �            1259    192438    Factures    TABLE     u  CREATE TABLE public."Factures" (
    id_fact integer NOT NULL,
    "Nom_user" character varying(255) NOT NULL,
    "Refrence_fact" character varying(255) NOT NULL,
    pdf_fact character varying(255) NOT NULL,
    "id_MainCmd" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_magasin integer
);
    DROP TABLE public."Factures";
       public         heap    postgres    false            �            1259    192437    Factures_id_fact_seq    SEQUENCE     �   CREATE SEQUENCE public."Factures_id_fact_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Factures_id_fact_seq";
       public          postgres    false    246            W           0    0    Factures_id_fact_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Factures_id_fact_seq" OWNED BY public."Factures".id_fact;
          public          postgres    false    245            �            1259    61506    Favoris    TABLE     �   CREATE TABLE public."Favoris" (
    id_fav integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_user integer,
    id_prod integer
);
    DROP TABLE public."Favoris";
       public         heap    postgres    false            �            1259    61505    Favoris_id_fav_seq    SEQUENCE     �   CREATE SEQUENCE public."Favoris_id_fav_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Favoris_id_fav_seq";
       public          postgres    false    234            X           0    0    Favoris_id_fav_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Favoris_id_fav_seq" OWNED BY public."Favoris".id_fav;
          public          postgres    false    233            �            1259    44421    Magasins    TABLE     G  CREATE TABLE public."Magasins" (
    id_magasin integer NOT NULL,
    "Libelle_magasin" character varying(255) NOT NULL,
    "Email_magasin" character varying(255) NOT NULL,
    "Adresse_magasin" character varying(255) NOT NULL,
    "Telephone_magasin" integer NOT NULL,
    "Description_magasin" character varying(255) NOT NULL,
    "Logo_magasin" character varying(255) NOT NULL,
    "Lien_facebook" character varying(255) NOT NULL,
    "Lien_instagram" character varying(255) NOT NULL,
    "Lien_linkedin" character varying(255) NOT NULL,
    "Lien_siteWeb" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_proprietaire integer,
    id_ville integer,
    etat_magasin character varying(255) DEFAULT 'En attente'::character varying NOT NULL
);
    DROP TABLE public."Magasins";
       public         heap    postgres    false            �            1259    44420    Magasins_id_magasin_seq    SEQUENCE     �   CREATE SEQUENCE public."Magasins_id_magasin_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Magasins_id_magasin_seq";
       public          postgres    false    220            Y           0    0    Magasins_id_magasin_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Magasins_id_magasin_seq" OWNED BY public."Magasins".id_magasin;
          public          postgres    false    219            �            1259    50542    Marques    TABLE     �   CREATE TABLE public."Marques" (
    id_marque integer NOT NULL,
    "Libelle_marque" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Marques";
       public         heap    postgres    false            �            1259    50541    Marques_id_marque_seq    SEQUENCE     �   CREATE SEQUENCE public."Marques_id_marque_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Marques_id_marque_seq";
       public          postgres    false    226            Z           0    0    Marques_id_marque_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Marques_id_marque_seq" OWNED BY public."Marques".id_marque;
          public          postgres    false    225            �            1259    56274    Matieres    TABLE     �   CREATE TABLE public."Matieres" (
    id_mat integer NOT NULL,
    "Libelle_mat" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Matieres";
       public         heap    postgres    false            �            1259    56273    Matieres_id_mat_seq    SEQUENCE     �   CREATE SEQUENCE public."Matieres_id_mat_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Matieres_id_mat_seq";
       public          postgres    false    232            [           0    0    Matieres_id_mat_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Matieres_id_mat_seq" OWNED BY public."Matieres".id_mat;
          public          postgres    false    231            �            1259    54349    Modeles    TABLE     '  CREATE TABLE public."Modeles" (
    id_modele integer NOT NULL,
    "Libelle_modele" character varying(255) NOT NULL,
    annee_modele character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_marque integer
);
    DROP TABLE public."Modeles";
       public         heap    postgres    false            �            1259    54348    Modeles_id_modele_seq    SEQUENCE     �   CREATE SEQUENCE public."Modeles_id_modele_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Modeles_id_modele_seq";
       public          postgres    false    230            \           0    0    Modeles_id_modele_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Modeles_id_modele_seq" OWNED BY public."Modeles".id_modele;
          public          postgres    false    229            �            1259    52501    Motorisations    TABLE     �   CREATE TABLE public."Motorisations" (
    id_motor integer NOT NULL,
    "Libelle_motor" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_modele integer
);
 #   DROP TABLE public."Motorisations";
       public         heap    postgres    false            �            1259    52500    Motorisations_id_motor_seq    SEQUENCE     �   CREATE SEQUENCE public."Motorisations_id_motor_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Motorisations_id_motor_seq";
       public          postgres    false    228            ]           0    0    Motorisations_id_motor_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Motorisations_id_motor_seq" OWNED BY public."Motorisations".id_motor;
          public          postgres    false    227            �            1259    162812    Products    TABLE     0  CREATE TABLE public."Products" (
    id_prod integer NOT NULL,
    "Libelle_prod" character varying(255) NOT NULL,
    "Caracteristiques_prod" character varying(1000) NOT NULL,
    "Reference_prod" character varying(255) NOT NULL,
    prix_prod double precision NOT NULL,
    "Image_thumbnail" character varying(255) NOT NULL,
    "Image_prod" character varying(1000) NOT NULL,
    "Stock_prod" integer NOT NULL,
    "Hauteur" integer,
    "Largeur" integer,
    "Epaisseur" integer,
    "Diametre" integer,
    "Longueur" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_cat integer,
    "createdBy" integer,
    id_magasin integer,
    id_marque integer,
    id_modele integer,
    id_motor integer,
    id_mat integer,
    id_subcat integer
);
    DROP TABLE public."Products";
       public         heap    postgres    false            �            1259    162811    Products_id_prod_seq    SEQUENCE     �   CREATE SEQUENCE public."Products_id_prod_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Products_id_prod_seq";
       public          postgres    false    244            ^           0    0    Products_id_prod_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Products_id_prod_seq" OWNED BY public."Products".id_prod;
          public          postgres    false    243            �            1259    214089    Reclamtions    TABLE     N  CREATE TABLE public."Reclamtions" (
    id_rec integer NOT NULL,
    "NomPrenom_rec" character varying(255) NOT NULL,
    "Email_rec" character varying(255) NOT NULL,
    "Telephone_rec" integer NOT NULL,
    description_rec text NOT NULL,
    file_rec text,
    "File_thumbnail" character varying(255) NOT NULL,
    "Profil_user" character varying(255),
    etat_rec character varying(255) DEFAULT 'En attente'::character varying NOT NULL,
    id_magasin integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_user integer
);
 !   DROP TABLE public."Reclamtions";
       public         heap    postgres    false            �            1259    214088    Reclamtions_id_rec_seq    SEQUENCE     �   CREATE SEQUENCE public."Reclamtions_id_rec_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Reclamtions_id_rec_seq";
       public          postgres    false    248            _           0    0    Reclamtions_id_rec_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Reclamtions_id_rec_seq" OWNED BY public."Reclamtions".id_rec;
          public          postgres    false    247            �            1259    49003    SubCategories    TABLE     ,  CREATE TABLE public."SubCategories" (
    id_subcat integer NOT NULL,
    "Libelle_subcat" character varying(255) NOT NULL,
    "Image_subcat" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_cat integer
);
 #   DROP TABLE public."SubCategories";
       public         heap    postgres    false            �            1259    49002    SubCategories_id_subcat_seq    SEQUENCE     �   CREATE SEQUENCE public."SubCategories_id_subcat_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."SubCategories_id_subcat_seq";
       public          postgres    false    224            `           0    0    SubCategories_id_subcat_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."SubCategories_id_subcat_seq" OWNED BY public."SubCategories".id_subcat;
          public          postgres    false    223            �            1259    41135    Users    TABLE       CREATE TABLE public."Users" (
    id_user integer NOT NULL,
    "Nom_user" character varying(255) NOT NULL,
    "Prenom_user" character varying(255) NOT NULL,
    "Email_user" character varying(255) NOT NULL,
    "MotDePasse_user" character varying(255) NOT NULL,
    "Telephone_user" integer NOT NULL,
    "Profil_user" character varying(255) DEFAULT 'client'::character varying NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    41134    Users_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_user_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Users_id_user_seq";
       public          postgres    false    218            a           0    0    Users_id_user_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Users_id_user_seq" OWNED BY public."Users".id_user;
          public          postgres    false    217            �            1259    29286    Villes    TABLE     �   CREATE TABLE public."Villes" (
    id_ville integer NOT NULL,
    "Libelle_ville" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Villes";
       public         heap    postgres    false            �            1259    29285    Villes_id_ville_seq    SEQUENCE     �   CREATE SEQUENCE public."Villes_id_ville_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Villes_id_ville_seq";
       public          postgres    false    216            b           0    0    Villes_id_ville_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Villes_id_ville_seq" OWNED BY public."Villes".id_ville;
          public          postgres    false    215            z           2604    83886    Adresse_Users id_adr    DEFAULT     �   ALTER TABLE ONLY public."Adresse_Users" ALTER COLUMN id_adr SET DEFAULT nextval('public."Adresse_Users_id_adr_seq"'::regclass);
 E   ALTER TABLE public."Adresse_Users" ALTER COLUMN id_adr DROP DEFAULT;
       public          postgres    false    235    236    236            s           2604    48975    Categorys id_cat    DEFAULT     x   ALTER TABLE ONLY public."Categorys" ALTER COLUMN id_cat SET DEFAULT nextval('public."Categorys_id_cat_seq"'::regclass);
 A   ALTER TABLE public."Categorys" ALTER COLUMN id_cat DROP DEFAULT;
       public          postgres    false    221    222    222            ~           2604    153258    Chats id_Chat    DEFAULT     t   ALTER TABLE ONLY public."Chats" ALTER COLUMN "id_Chat" SET DEFAULT nextval('public."Chats_id_Chat_seq"'::regclass);
 @   ALTER TABLE public."Chats" ALTER COLUMN "id_Chat" DROP DEFAULT;
       public          postgres    false    242    241    242            }           2604    104093    CommandeDetails id_dtcmd    DEFAULT     �   ALTER TABLE ONLY public."CommandeDetails" ALTER COLUMN id_dtcmd SET DEFAULT nextval('public."CommandeDetails_id_dtcmd_seq"'::regclass);
 I   ALTER TABLE public."CommandeDetails" ALTER COLUMN id_dtcmd DROP DEFAULT;
       public          postgres    false    239    240    240            {           2604    104073    Commandes id_cmd    DEFAULT     x   ALTER TABLE ONLY public."Commandes" ALTER COLUMN id_cmd SET DEFAULT nextval('public."Commandes_id_cmd_seq"'::regclass);
 A   ALTER TABLE public."Commandes" ALTER COLUMN id_cmd DROP DEFAULT;
       public          postgres    false    238    237    238            �           2604    192441    Factures id_fact    DEFAULT     x   ALTER TABLE ONLY public."Factures" ALTER COLUMN id_fact SET DEFAULT nextval('public."Factures_id_fact_seq"'::regclass);
 A   ALTER TABLE public."Factures" ALTER COLUMN id_fact DROP DEFAULT;
       public          postgres    false    246    245    246            y           2604    61509    Favoris id_fav    DEFAULT     t   ALTER TABLE ONLY public."Favoris" ALTER COLUMN id_fav SET DEFAULT nextval('public."Favoris_id_fav_seq"'::regclass);
 ?   ALTER TABLE public."Favoris" ALTER COLUMN id_fav DROP DEFAULT;
       public          postgres    false    234    233    234            q           2604    44424    Magasins id_magasin    DEFAULT     ~   ALTER TABLE ONLY public."Magasins" ALTER COLUMN id_magasin SET DEFAULT nextval('public."Magasins_id_magasin_seq"'::regclass);
 D   ALTER TABLE public."Magasins" ALTER COLUMN id_magasin DROP DEFAULT;
       public          postgres    false    220    219    220            u           2604    50545    Marques id_marque    DEFAULT     z   ALTER TABLE ONLY public."Marques" ALTER COLUMN id_marque SET DEFAULT nextval('public."Marques_id_marque_seq"'::regclass);
 B   ALTER TABLE public."Marques" ALTER COLUMN id_marque DROP DEFAULT;
       public          postgres    false    226    225    226            x           2604    56277    Matieres id_mat    DEFAULT     v   ALTER TABLE ONLY public."Matieres" ALTER COLUMN id_mat SET DEFAULT nextval('public."Matieres_id_mat_seq"'::regclass);
 @   ALTER TABLE public."Matieres" ALTER COLUMN id_mat DROP DEFAULT;
       public          postgres    false    232    231    232            w           2604    54352    Modeles id_modele    DEFAULT     z   ALTER TABLE ONLY public."Modeles" ALTER COLUMN id_modele SET DEFAULT nextval('public."Modeles_id_modele_seq"'::regclass);
 B   ALTER TABLE public."Modeles" ALTER COLUMN id_modele DROP DEFAULT;
       public          postgres    false    229    230    230            v           2604    52504    Motorisations id_motor    DEFAULT     �   ALTER TABLE ONLY public."Motorisations" ALTER COLUMN id_motor SET DEFAULT nextval('public."Motorisations_id_motor_seq"'::regclass);
 G   ALTER TABLE public."Motorisations" ALTER COLUMN id_motor DROP DEFAULT;
       public          postgres    false    227    228    228                       2604    162815    Products id_prod    DEFAULT     x   ALTER TABLE ONLY public."Products" ALTER COLUMN id_prod SET DEFAULT nextval('public."Products_id_prod_seq"'::regclass);
 A   ALTER TABLE public."Products" ALTER COLUMN id_prod DROP DEFAULT;
       public          postgres    false    244    243    244            �           2604    214092    Reclamtions id_rec    DEFAULT     |   ALTER TABLE ONLY public."Reclamtions" ALTER COLUMN id_rec SET DEFAULT nextval('public."Reclamtions_id_rec_seq"'::regclass);
 C   ALTER TABLE public."Reclamtions" ALTER COLUMN id_rec DROP DEFAULT;
       public          postgres    false    248    247    248            t           2604    49006    SubCategories id_subcat    DEFAULT     �   ALTER TABLE ONLY public."SubCategories" ALTER COLUMN id_subcat SET DEFAULT nextval('public."SubCategories_id_subcat_seq"'::regclass);
 H   ALTER TABLE public."SubCategories" ALTER COLUMN id_subcat DROP DEFAULT;
       public          postgres    false    224    223    224            n           2604    41138    Users id_user    DEFAULT     r   ALTER TABLE ONLY public."Users" ALTER COLUMN id_user SET DEFAULT nextval('public."Users_id_user_seq"'::regclass);
 >   ALTER TABLE public."Users" ALTER COLUMN id_user DROP DEFAULT;
       public          postgres    false    217    218    218            m           2604    29289    Villes id_ville    DEFAULT     v   ALTER TABLE ONLY public."Villes" ALTER COLUMN id_ville SET DEFAULT nextval('public."Villes_id_ville_seq"'::regclass);
 @   ALTER TABLE public."Villes" ALTER COLUMN id_ville DROP DEFAULT;
       public          postgres    false    215    216    216            �           2606    83888     Adresse_Users Adresse_Users_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Adresse_Users"
    ADD CONSTRAINT "Adresse_Users_pkey" PRIMARY KEY (id_adr);
 N   ALTER TABLE ONLY public."Adresse_Users" DROP CONSTRAINT "Adresse_Users_pkey";
       public            postgres    false    236            �           2606    48979    Categorys Categorys_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Categorys"
    ADD CONSTRAINT "Categorys_pkey" PRIMARY KEY (id_cat);
 F   ALTER TABLE ONLY public."Categorys" DROP CONSTRAINT "Categorys_pkey";
       public            postgres    false    222            �           2606    153262    Chats Chats_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Chats"
    ADD CONSTRAINT "Chats_pkey" PRIMARY KEY ("id_Chat");
 >   ALTER TABLE ONLY public."Chats" DROP CONSTRAINT "Chats_pkey";
       public            postgres    false    242            �           2606    104095 $   CommandeDetails CommandeDetails_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."CommandeDetails"
    ADD CONSTRAINT "CommandeDetails_pkey" PRIMARY KEY (id_dtcmd);
 R   ALTER TABLE ONLY public."CommandeDetails" DROP CONSTRAINT "CommandeDetails_pkey";
       public            postgres    false    240            �           2606    104078    Commandes Commandes_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Commandes"
    ADD CONSTRAINT "Commandes_pkey" PRIMARY KEY (id_cmd);
 F   ALTER TABLE ONLY public."Commandes" DROP CONSTRAINT "Commandes_pkey";
       public            postgres    false    238            �           2606    192445    Factures Factures_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Factures"
    ADD CONSTRAINT "Factures_pkey" PRIMARY KEY (id_fact);
 D   ALTER TABLE ONLY public."Factures" DROP CONSTRAINT "Factures_pkey";
       public            postgres    false    246            �           2606    61511    Favoris Favoris_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Favoris"
    ADD CONSTRAINT "Favoris_pkey" PRIMARY KEY (id_fav);
 B   ALTER TABLE ONLY public."Favoris" DROP CONSTRAINT "Favoris_pkey";
       public            postgres    false    234            �           2606    44429    Magasins Magasins_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Magasins"
    ADD CONSTRAINT "Magasins_pkey" PRIMARY KEY (id_magasin);
 D   ALTER TABLE ONLY public."Magasins" DROP CONSTRAINT "Magasins_pkey";
       public            postgres    false    220            �           2606    50547    Marques Marques_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Marques"
    ADD CONSTRAINT "Marques_pkey" PRIMARY KEY (id_marque);
 B   ALTER TABLE ONLY public."Marques" DROP CONSTRAINT "Marques_pkey";
       public            postgres    false    226            �           2606    56279    Matieres Matieres_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Matieres"
    ADD CONSTRAINT "Matieres_pkey" PRIMARY KEY (id_mat);
 D   ALTER TABLE ONLY public."Matieres" DROP CONSTRAINT "Matieres_pkey";
       public            postgres    false    232            �           2606    54356    Modeles Modeles_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Modeles"
    ADD CONSTRAINT "Modeles_pkey" PRIMARY KEY (id_modele);
 B   ALTER TABLE ONLY public."Modeles" DROP CONSTRAINT "Modeles_pkey";
       public            postgres    false    230            �           2606    52506     Motorisations Motorisations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."Motorisations"
    ADD CONSTRAINT "Motorisations_pkey" PRIMARY KEY (id_motor);
 N   ALTER TABLE ONLY public."Motorisations" DROP CONSTRAINT "Motorisations_pkey";
       public            postgres    false    228            �           2606    162819    Products Products_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id_prod);
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            postgres    false    244            �           2606    214097    Reclamtions Reclamtions_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Reclamtions"
    ADD CONSTRAINT "Reclamtions_pkey" PRIMARY KEY (id_rec);
 J   ALTER TABLE ONLY public."Reclamtions" DROP CONSTRAINT "Reclamtions_pkey";
       public            postgres    false    248            �           2606    49010     SubCategories SubCategories_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public."SubCategories"
    ADD CONSTRAINT "SubCategories_pkey" PRIMARY KEY (id_subcat);
 N   ALTER TABLE ONLY public."SubCategories" DROP CONSTRAINT "SubCategories_pkey";
       public            postgres    false    224            �           2606    41144    Users Users_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id_user);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    218            �           2606    29291    Villes Villes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Villes"
    ADD CONSTRAINT "Villes_pkey" PRIMARY KEY (id_ville);
 @   ALTER TABLE ONLY public."Villes" DROP CONSTRAINT "Villes_pkey";
       public            postgres    false    216            �           2606    218026 (   Adresse_Users Adresse_Users_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Adresse_Users"
    ADD CONSTRAINT "Adresse_Users_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."Users"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."Adresse_Users" DROP CONSTRAINT "Adresse_Users_id_user_fkey";
       public          postgres    false    4742    236    218            �           2606    218031 )   Adresse_Users Adresse_Users_id_ville_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Adresse_Users"
    ADD CONSTRAINT "Adresse_Users_id_ville_fkey" FOREIGN KEY (id_ville) REFERENCES public."Villes"(id_ville) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."Adresse_Users" DROP CONSTRAINT "Adresse_Users_id_ville_fkey";
       public          postgres    false    216    236    4740            �           2606    218113 +   CommandeDetails CommandeDetails_id_cmd_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CommandeDetails"
    ADD CONSTRAINT "CommandeDetails_id_cmd_fkey" FOREIGN KEY (id_cmd) REFERENCES public."Commandes"(id_cmd) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public."CommandeDetails" DROP CONSTRAINT "CommandeDetails_id_cmd_fkey";
       public          postgres    false    238    4762    240            �           2606    218123 /   CommandeDetails CommandeDetails_id_magasin_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CommandeDetails"
    ADD CONSTRAINT "CommandeDetails_id_magasin_fkey" FOREIGN KEY (id_magasin) REFERENCES public."Magasins"(id_magasin) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."CommandeDetails" DROP CONSTRAINT "CommandeDetails_id_magasin_fkey";
       public          postgres    false    4744    220    240            �           2606    218118 ,   CommandeDetails CommandeDetails_id_prod_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CommandeDetails"
    ADD CONSTRAINT "CommandeDetails_id_prod_fkey" FOREIGN KEY (id_prod) REFERENCES public."Products"(id_prod) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public."CommandeDetails" DROP CONSTRAINT "CommandeDetails_id_prod_fkey";
       public          postgres    false    4768    244    240            �           2606    218108 #   Commandes Commandes_id_magasin_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Commandes"
    ADD CONSTRAINT "Commandes_id_magasin_fkey" FOREIGN KEY (id_magasin) REFERENCES public."Magasins"(id_magasin) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."Commandes" DROP CONSTRAINT "Commandes_id_magasin_fkey";
       public          postgres    false    220    238    4744            �           2606    218103     Commandes Commandes_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Commandes"
    ADD CONSTRAINT "Commandes_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."Users"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."Commandes" DROP CONSTRAINT "Commandes_id_user_fkey";
       public          postgres    false    218    4742    238            �           2606    218128 !   Factures Factures_id_magasin_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Factures"
    ADD CONSTRAINT "Factures_id_magasin_fkey" FOREIGN KEY (id_magasin) REFERENCES public."Magasins"(id_magasin) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Factures" DROP CONSTRAINT "Factures_id_magasin_fkey";
       public          postgres    false    4744    220    246            �           2606    218096    Favoris Favoris_id_prod_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Favoris"
    ADD CONSTRAINT "Favoris_id_prod_fkey" FOREIGN KEY (id_prod) REFERENCES public."Products"(id_prod) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Favoris" DROP CONSTRAINT "Favoris_id_prod_fkey";
       public          postgres    false    4768    244    234            �           2606    218091    Favoris Favoris_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Favoris"
    ADD CONSTRAINT "Favoris_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."Users"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Favoris" DROP CONSTRAINT "Favoris_id_user_fkey";
       public          postgres    false    4742    218    234            �           2606    218007 &   Magasins Magasins_id_proprietaire_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Magasins"
    ADD CONSTRAINT "Magasins_id_proprietaire_fkey" FOREIGN KEY (id_proprietaire) REFERENCES public."Users"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."Magasins" DROP CONSTRAINT "Magasins_id_proprietaire_fkey";
       public          postgres    false    218    220    4742            �           2606    218012    Magasins Magasins_id_ville_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Magasins"
    ADD CONSTRAINT "Magasins_id_ville_fkey" FOREIGN KEY (id_ville) REFERENCES public."Villes"(id_ville) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Magasins" DROP CONSTRAINT "Magasins_id_ville_fkey";
       public          postgres    false    216    4740    220            �           2606    218036    Modeles Modeles_id_marque_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Modeles"
    ADD CONSTRAINT "Modeles_id_marque_fkey" FOREIGN KEY (id_marque) REFERENCES public."Marques"(id_marque) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."Modeles" DROP CONSTRAINT "Modeles_id_marque_fkey";
       public          postgres    false    226    4750    230            �           2606    218041 *   Motorisations Motorisations_id_modele_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Motorisations"
    ADD CONSTRAINT "Motorisations_id_modele_fkey" FOREIGN KEY (id_modele) REFERENCES public."Modeles"(id_modele) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."Motorisations" DROP CONSTRAINT "Motorisations_id_modele_fkey";
       public          postgres    false    4754    230    228            �           2606    218056     Products Products_createdBy_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."Users"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_createdBy_fkey";
       public          postgres    false    218    244    4742            �           2606    218051    Products Products_id_cat_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_id_cat_fkey" FOREIGN KEY (id_cat) REFERENCES public."Categorys"(id_cat) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_id_cat_fkey";
       public          postgres    false    244    4746    222            �           2606    218061 !   Products Products_id_magasin_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_id_magasin_fkey" FOREIGN KEY (id_magasin) REFERENCES public."Magasins"(id_magasin) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_id_magasin_fkey";
       public          postgres    false    220    4744    244            �           2606    218066     Products Products_id_marque_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_id_marque_fkey" FOREIGN KEY (id_marque) REFERENCES public."Marques"(id_marque) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_id_marque_fkey";
       public          postgres    false    4750    226    244            �           2606    218081    Products Products_id_mat_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_id_mat_fkey" FOREIGN KEY (id_mat) REFERENCES public."Matieres"(id_mat) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_id_mat_fkey";
       public          postgres    false    4756    244    232            �           2606    218071     Products Products_id_modele_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_id_modele_fkey" FOREIGN KEY (id_modele) REFERENCES public."Modeles"(id_modele) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_id_modele_fkey";
       public          postgres    false    244    4754    230            �           2606    218076    Products Products_id_motor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_id_motor_fkey" FOREIGN KEY (id_motor) REFERENCES public."Motorisations"(id_motor) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_id_motor_fkey";
       public          postgres    false    228    244    4752            �           2606    218086     Products Products_id_subcat_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_id_subcat_fkey" FOREIGN KEY (id_subcat) REFERENCES public."SubCategories"(id_subcat) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_id_subcat_fkey";
       public          postgres    false    244    224    4748            �           2606    218021 $   Reclamtions Reclamtions_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reclamtions"
    ADD CONSTRAINT "Reclamtions_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."Users"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."Reclamtions" DROP CONSTRAINT "Reclamtions_id_user_fkey";
       public          postgres    false    4742    248    218            �           2606    218046 '   SubCategories SubCategories_id_cat_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SubCategories"
    ADD CONSTRAINT "SubCategories_id_cat_fkey" FOREIGN KEY (id_cat) REFERENCES public."Categorys"(id_cat) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public."SubCategories" DROP CONSTRAINT "SubCategories_id_cat_fkey";
       public          postgres    false    222    4746    224           