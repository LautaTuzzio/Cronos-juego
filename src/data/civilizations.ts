export interface Event {
  id: string;
  title: string;
  year: string;  // Using string to handle BCE/CE format
  briefDescription: string;
  fullDescription: string;
  image: string;
  importance: string;
}

export interface Civilization {
  id: string;
  name: string;
  description: string;
  image: string;
  period: string;
  events: Event[];
  bestProgress?: number; // Number of correct cards in best game
}

const civilizations: Civilization[] = [
  {
    id: "ancient-rome",
    name: "Imperio Romano",
    description: "Una de las civilizaciones más influyentes de la historia occidental que estableció instituciones políticas, legales y culturales duraderas.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/1280px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg",
    period: "753 a.C. - 476 d.C.",
    events: [
      {
        id: "rome-001",
        title: "Fundación de Roma",
        year: "-753",
        briefDescription: "Según la leyenda, Rómulo funda la ciudad de Roma tras matar a su hermano Remo.",
        fullDescription: "La leyenda cuenta que los gemelos Rómulo y Remo, hijos del dios Marte y rescatados y criados por una loba, fundaron la ciudad. Después de una disputa sobre dónde construir la ciudad, Rómulo mató a Remo y fundó Roma en el monte Palatino.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/She-wolf_suckles_Romulus_and_Remus.jpg/1280px-She-wolf_suckles_Romulus_and_Remus.jpg",
        importance: "Este evento marca el inicio simbólico de la ciudad que se convertiría en el centro del mayor imperio de la antigüedad occidental."
      },
      {
        id: "rome-002",
        title: "Establecimiento de la República Romana",
        year: "-509",
        briefDescription: "Tras la expulsión del último rey etrusco, se establece la República.",
        fullDescription: "Tras la tiranía del último rey etrusco, Tarquinio el Soberbio, los romanos establecieron un sistema republicano de gobierno con dos cónsules electos anualmente y un senado como órgano consultivo principal.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Roman_Forum_%28Rome%29_-_Temple_of_Saturn_-_Remains_of_the_front_portico_with_the_three_columns_-_Front_view.jpg/1280px-Roman_Forum_%28Rome%29_-_Temple_of_Saturn_-_Remains_of_the_front_portico_with_the_three_columns_-_Front_view.jpg",
        importance: "Estableció un sistema de gobierno con principios que influirían en las democracias modernas."
      },
      {
        id: "rome-003",
        title: "Las Guerras Púnicas",
        year: "-264",
        briefDescription: "Serie de tres guerras entre Roma y Cartago por el control del Mediterráneo Occidental.",
        fullDescription: "Las Guerras Púnicas fueron tres conflictos militares entre Roma y Cartago que ocurrieron entre el 264 a.C. y el 146 a.C. El resultado fue la destrucción completa de Cartago y la expansión romana en el norte de África.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Hannibal_traversant_les_Alpes_%C3%A0_dos_d%27%C3%A9l%C3%A9phant.jpg/1280px-Hannibal_traversant_les_Alpes_%C3%A0_dos_d%27%C3%A9l%C3%A9phant.jpg",
        importance: "Estas guerras transformaron a Roma de una potencia regional a una potencia mediterránea."
      },
      {
        id: "rome-004",
        title: "Asesinato de Julio César",
        year: "-44",
        briefDescription: "César es asesinado por senadores romanos liderados por Bruto y Casio.",
        fullDescription: "Tras consolidar su poder como dictador perpetuo, Julio César fue asesinado en los idus de marzo por un grupo de senadores que temían que quisiera establecer una monarquía. Su muerte desencadenó una nueva guerra civil.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Death_of_Caesar_-_Walters_37884.jpg/1280px-Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Death_of_Caesar_-_Walters_37884.jpg",
        importance: "Este evento precipitó el fin de la República Romana y el eventual surgimiento del Imperio Romano."
      },
      {
        id: "rome-005",
        title: "Augusto se convierte en el primer emperador romano",
        year: "-27",
        briefDescription: "Octavio, sobrino de César, recibe el título de Augusto por el Senado, marcando el inicio del Imperio.",
        fullDescription: "Tras derrotar a Marco Antonio y Cleopatra en la Batalla de Accio, Octavio consolidó su poder. El Senado le otorgó el título de Augusto y formalmente comenzó la era imperial, aunque mantuvo una fachada republicana.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Augustus_of_Prima_Porta_%28Vatican_Museums%29.jpg/800px-Augustus_of_Prima_Porta_%28Vatican_Museums%29.jpg",
        importance: "Inició el período conocido como Pax Romana, dos siglos de relativa paz y prosperidad."
      },
      {
        id: "rome-006",
        title: "Construcción del Coliseo Romano",
        year: "80",
        briefDescription: "Se completa la construcción del anfiteatro Flavio, conocido como el Coliseo.",
        fullDescription: "Iniciado por el emperador Vespasiano y completado por su hijo Tito, el Coliseo podía albergar entre 50,000 y 80,000 espectadores para diversos eventos públicos como gladiadores, ejecuciones y recreaciones de batallas famosas.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
        importance: "Se convirtió en el símbolo del poder y la ingeniería romana, y sigue siendo uno de los monumentos más reconocibles del mundo antiguo."
      },
      {
        id: "rome-007",
        title: "Caída del Imperio Romano de Occidente",
        year: "476",
        briefDescription: "El último emperador romano occidental, Rómulo Augústulo, es depuesto por el bárbaro Odoacro.",
        fullDescription: "Tras décadas de declive, invasiones bárbaras y crisis internas, el Imperio Romano de Occidente llegó a su fin cuando el joven emperador Rómulo Augústulo fue depuesto por Odoacro, jefe de la tribu germánica de los hérulos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Alaric_entering_Athens.jpg/1280px-Alaric_entering_Athens.jpg",
        importance: "Marca el fin convencional de la Antigüedad clásica y el inicio de la Edad Media en Europa Occidental."
      }
    ],
    bestProgress: 4
  },
  {
    id: "ancient-greece",
    name: "Antigua Grecia",
    description: "Cuna de la democracia, la filosofía, las ciencias y las artes occidentales, la civilización griega antigua estableció las bases de nuestra cultura moderna.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/1280px-The_Parthenon_in_Athens.jpg",
    period: "800 a.C. - 146 a.C.",
    events: [
      {
        id: "greece-001",
        title: "Primeros Juegos Olímpicos",
        year: "-776",
        briefDescription: "Celebración de los primeros Juegos Olímpicos registrados en la historia.",
        fullDescription: "Los primeros Juegos Olímpicos documentados se celebraron en Olimpia, dedicados a los dioses olímpicos. Incluían principalmente carreras a pie, pero con el tiempo se añadieron más disciplinas como lucha, boxeo y carreras de carros.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Discobolus_Lancellotti_Massimo.jpg/800px-Discobolus_Lancellotti_Massimo.jpg",
        importance: "Representaron una tregua sagrada entre las ciudades-estado griegas y son la base de los Juegos Olímpicos modernos."
      },
      {
        id: "greece-002",
        title: "Reformas de Solón en Atenas",
        year: "-594",
        briefDescription: "Solón implementa reformas políticas y económicas que sientan las bases de la democracia ateniense.",
        fullDescription: "Nombrado arconte con poderes especiales, Solón abolió la esclavitud por deudas, reorganizó la sociedad ateniense en clases basadas en la riqueza en lugar del nacimiento, y estableció un consejo de 400 miembros.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Solon_legislation_Louvre_Ma2578.jpg/1024px-Solon_legislation_Louvre_Ma2578.jpg",
        importance: "Sus reformas sentaron las bases para la posterior democracia ateniense y aliviaron las tensiones entre las clases sociales."
      },
      {
        id: "greece-003",
        title: "Batalla de Maratón",
        year: "-490",
        briefDescription: "Los atenienses derrotan a los persas evitando la conquista de Grecia.",
        fullDescription: "Durante la Primera Guerra Médica, los atenienses, liderados por Milcíades, derrotaron a un ejército persa numéricamente superior enviado por el rey Darío I para castigar a Atenas por su apoyo a las ciudades jonias rebeldes.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Battle_of_Marathon_by_Creuse.jpg/1280px-Battle_of_Marathon_by_Creuse.jpg",
        importance: "Esta victoria preservó la independencia de Atenas y contribuyó al surgimiento de su Edad de Oro."
      },
      {
        id: "greece-004",
        title: "Edad de Oro de Atenas",
        year: "-480",
        briefDescription: "Período de florecimiento cultural y político bajo el liderazgo de Pericles.",
        fullDescription: "Tras las Guerras Médicas, Atenas experimentó un período de extraordinario desarrollo cultural, intelectual y artístico. Bajo el liderazgo de Pericles, se construyeron monumentos como el Partenón y florecieron la democracia, la filosofía, el teatro y las artes.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pericles_Pio-Clementino_Inv269_n2.jpg/800px-Pericles_Pio-Clementino_Inv269_n2.jpg",
        importance: "Este período produjo algunas de las obras más influyentes de la civilización occidental en filosofía, arte, arquitectura y política."
      },
      {
        id: "greece-005",
        title: "Guerra del Peloponeso",
        year: "-431",
        briefDescription: "Conflicto entre Atenas y Esparta que debilitó a todas las polis griegas.",
        fullDescription: "La Guerra del Peloponeso fue un conflicto de 27 años entre la Liga de Delos liderada por Atenas y la Liga del Peloponeso liderada por Esparta. Terminó con la derrota de Atenas y la imposición de los Treinta Tiranos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Peloponnesian_war_alliances_431_BC.png/1280px-Peloponnesian_war_alliances_431_BC.png",
        importance: "Debilitó permanentemente a las principales potencias griegas, preparando el camino para la posterior dominación macedónica."
      },
      {
        id: "greece-006",
        title: "Conquistas de Alejandro Magno",
        year: "-336",
        briefDescription: "Alejandro de Macedonia conquista el Imperio Persa y extiende la cultura griega.",
        fullDescription: "Sucediendo a su padre Felipe II, Alejandro conquistó el Imperio Persa, Egipto y partes de la India, creando uno de los imperios más grandes de la antigüedad. Fundó numerosas ciudades y difundió la cultura helenística por todo su imperio.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic.jpg/1280px-Alexander_the_Great_mosaic.jpg",
        importance: "Sus conquistas difundieron la cultura griega por Asia y África, iniciando la era helenística y transformando profundamente el mundo antiguo."
      },
      {
        id: "greece-007",
        title: "Conquista romana de Grecia",
        year: "-146",
        briefDescription: "Grecia cae bajo el dominio romano tras la batalla de Corinto.",
        fullDescription: "Tras la derrota de la Liga Aquea en la batalla de Corinto, los romanos saquearon la ciudad y establecieron la provincia de Acaya. Grecia pasó a formar parte del Imperio Romano, aunque su cultura seguiría ejerciendo una profunda influencia en Roma.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mummius_sacking_Corinth.jpg/1280px-Mummius_sacking_Corinth.jpg",
        importance: "Marca el fin de la independencia política griega, aunque su cultura continuó influyendo profundamente en el mundo romano."
      }
    ],
    bestProgress: 3
  },
  {
    id: "french-revolution",
    name: "Revolución Francesa",
    description: "Período de transformación política y social radical que cambió Francia y extendió ideas revolucionarias por Europa y el mundo.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Prise_de_la_Bastille.jpg/1280px-Prise_de_la_Bastille.jpg",
    period: "1789 - 1799",
    events: [
      {
        id: "french-001",
        title: "Convocatoria de los Estados Generales",
        year: "1789",
        briefDescription: "Luis XVI convoca a los Estados Generales para resolver la crisis fiscal.",
        fullDescription: "Ante una grave crisis económica y fiscal, el rey Luis XVI convocó a los Estados Generales, una asamblea de representantes de los tres estamentos (nobleza, clero y Tercer Estado) que no se había reunido desde 1614, para aprobar nuevos impuestos.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Estatesgeneral.jpg/1280px-Estatesgeneral.jpg",
        importance: "Este evento marcó el inicio del proceso revolucionario al reunir representantes de toda Francia que pronto desafiarían el orden establecido."
      },
      {
        id: "french-002",
        title: "Juramento del Juego de Pelota",
        year: "1789",
        briefDescription: "Los representantes del Tercer Estado juran no separarse hasta dar una constitución a Francia.",
        fullDescription: "El 20 de junio de 1789, los diputados del Tercer Estado, que se habían declarado Asamblea Nacional, encontraron cerrada su sala de reuniones y se trasladaron a una cancha de juego de pelota cercana, donde juraron no disolverse hasta haber dotado a Francia de una constitución.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Le_Serment_du_Jeu_de_paume.jpg/1280px-Le_Serment_du_Jeu_de_paume.jpg",
        importance: "Este acto desafiante marcó el primer acto revolucionario directo contra la autoridad monárquica."
      },
      {
        id: "french-003",
        title: "Toma de la Bastilla",
        year: "1789",
        briefDescription: "Una multitud parisina asalta la prisión de la Bastilla, símbolo del poder real.",
        fullDescription: "El 14 de julio de 1789, una multitud parisina asaltó la Bastilla, una fortaleza-prisión que simbolizaba el despotismo real, en busca de armas y municiones. Aunque solo había siete prisioneros, el evento se convirtió en el símbolo de la Revolución.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Prise_de_la_Bastille.jpg/1280px-Prise_de_la_Bastille.jpg",
        importance: "Este evento simbolizó la caída del Antiguo Régimen y es conmemorado en la fiesta nacional francesa del 14 de julio."
      },
      {
        id: "french-004",
        title: "Declaración de los Derechos del Hombre y del Ciudadano",
        year: "1789",
        briefDescription: "Documento fundamental que proclama los derechos universales.",
        fullDescription: "Inspirada en la Declaración de Independencia estadounidense y en las ideas de la Ilustración, este documento proclamaba que 'los hombres nacen y permanecen libres e iguales en derechos' y defendía los derechos a la libertad, la propiedad, la seguridad y la resistencia a la opresión.",
        image: "https://images.pexels.com/photos/4669109/pexels-photo-4669109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        importance: "Esta declaración se convirtió en uno de los textos fundamentales sobre derechos humanos y sirvió de inspiración para constituciones y declaraciones similares en todo el mundo."
      },
      {
        id: "french-005",
        title: "Ejecución de Luis XVI",
        year: "1793",
        briefDescription: "El rey es guillotinado tras ser juzgado por traición.",
        fullDescription: "Tras el fallido intento de fuga de la familia real y la radicalización de la revolución, Luis XVI fue juzgado por la Convención Nacional, declarado culpable de traición y ejecutado en la guillotina el 21 de enero de 1793.",
        image: "https://images.pexels.com/photos/6507483/pexels-photo-6507483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        importance: "La ejecución del rey marcó un punto de no retorno en la Revolución y provocó la formación de la Primera Coalición contra Francia."
      },
      {
        id: "french-006",
        title: "El Reinado del Terror",
        year: "1793",
        briefDescription: "Período de represión y ejecuciones masivas bajo el liderazgo de Robespierre.",
        fullDescription: "Bajo el liderazgo del Comité de Salvación Pública dominado por Robespierre, Francia experimentó un período de represión política extrema. Miles de personas consideradas enemigas de la Revolución fueron ejecutadas en la guillotina.",
        image: "https://images.pexels.com/photos/12481053/pexels-photo-12481053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        importance: "Este período reveló el lado oscuro de la revolución y terminó con la caída y ejecución de Robespierre en julio de 1794."
      },
      {
        id: "french-007",
        title: "Golpe de Estado del 18 Brumario",
        year: "1799",
        briefDescription: "Napoleón Bonaparte toma el poder mediante un golpe de estado.",
        fullDescription: "El 9 de noviembre de 1799 (18 de Brumario según el calendario revolucionario), Napoleón Bonaparte dio un golpe de estado que derrocó al Directorio. Estableció el Consulado, con él mismo como Primer Cónsul, poniendo fin efectivo a la Revolución.",
        image: "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        importance: "Este evento marcó el fin del período revolucionario y el inicio de la era napoleónica, que preservaría muchos logros civiles de la Revolución."
      }
    ],
    bestProgress: 0
  }
];

export default civilizations;