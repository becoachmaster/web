// ════════════════════════════════════════════════════════════════════
//  DATOS — Preguntas, bloqueos, nudos e ilustraciones
//  v2 — Preguntas revisadas (15), nombres y textos nuevos
// ════════════════════════════════════════════════════════════════════

// ── PREGUNTAS ─────────────────────────────────────────────────────
// Orden: SA → D → C rotando (5 por bloqueo)
// inv:true = respuesta alta es saludable → se invierte al calcular
var PREGUNTAS = [
  { id:1,  b:'sa', inv:false, texto:'Cuando alguien que respetas cuestiona algo que decidiste, ¿qué tan fácil es para ti sostenerte en tu decisión sin necesitar explicarte o convencerlos?' },
  { id:2,  b:'d',  inv:false, texto:'Piensa en tu semana pasada. ¿Qué tan bien refleja lo que hiciste, lo que realmente te importa?' },
  { id:3,  b:'c',  inv:false, texto:'Cuando algo empieza a salirte bien de verdad — un proyecto, una relación, un logro — ¿qué tan frecuente es que aparece algo que lo frena o lo complica?' },
  { id:4,  b:'sa', inv:true,  texto:'Cuando estás solo, sin nada que hacer ni nadie que atender, ¿qué tan cómodo te sientes con lo que encuentras ahí?' },
  { id:5,  b:'d',  inv:false, texto:'¿Con qué frecuencia terminas el día sintiendo que te moviste mucho, pero no hacia lo que realmente importa?' },
  { id:6,  b:'c',  inv:false, texto:'Cuando piensas en tener exactamente la vida que quieres — no una parecida, la que realmente quieres — ¿qué tan natural se siente que eso sea para ti?' },
  { id:7,  b:'sa', inv:false, texto:'Cuando las personas más cercanas a ti — pareja, hijos, equipo — reaccionan mal ante algo que hiciste, ¿desde qué lugar respondes: desde lo que realmente sientes, o desde el miedo a lo que pueden pensar de ti?' },
  { id:8,  b:'d',  inv:false, texto:'¿Con qué frecuencia pospones algo que sabes que es importante para ti, para atender algo urgente que en el fondo importa menos?' },
  { id:9,  b:'c',  inv:false, texto:'Cuando llegas cerca de un logro importante, ¿con qué frecuencia aparece una voz interna que duda si realmente puedes terminarlo, o si realmente lo mereces?' },
  { id:10, b:'sa', inv:true,  texto:'¿Qué tan claro tienes el hilo entre quién eras hace cinco años, quién eres hoy y hacia dónde vas — más allá de los roles que tienes?' },
  { id:11, b:'d',  inv:true,  texto:'En este momento, ¿qué tan claro tienes cuál es el siguiente paso concreto que te acerca a lo que más quieres en la vida?' },
  { id:12, b:'c',  inv:false, texto:'Cuando alguien logra algo que tú también quieres, ¿con qué frecuencia sientes que ellos tienen algo — condiciones, suerte, talento, contactos — que tú no tienes?' },
  { id:13, b:'sa', inv:false, texto:'Piensa en la última vez que reaccionaste de una manera que después lamentaste — con tu pareja, tus hijos, alguien cercano. ¿Qué tan frecuente es ese patrón en ti?' },
  { id:14, b:'d',  inv:false, texto:'Al final del día, ¿con qué frecuencia sientes que viviste para lo que realmente importa — y no solo para lo que tocaba cumplir?' },
  { id:15, b:'c',  inv:false, texto:'¿Qué tan seguido sientes que ciertas formas de ser tuyas — de reaccionar, de bloquearte, de rendirte — son simplemente como eres, y que cambiarlas está fuera de tu alcance?' },
];

// ── BLOQUEOS ──────────────────────────────────────────────────────
// Cada bloqueo tiene:
//   apertura   → frase inicial en pantalla
//   desc       → lo que está pasando (pantalla)
//   frena      → cómo te está frenando (pantalla)
//   raiz       → párrafo de la raíz (pantalla)
//   gancho     → texto que activa el deseo de recibir el email (pantalla)
//   intentado  → solo email
//   emocion    → solo email
//   relaciones → solo email
//   cierre     → solo email
var BLOQUEOS = {

  d: {
    nombre:  'Brújula sin Norte',
    color:   '#B8A08C',
    colorL:  'rgba(184,160,140,0.2)',

    apertura: 'Te mueves. Te esfuerzas. Cumples. Y aun así, al final del día, algo no cierra.',

    desc: 'Tienes energía. Tienes intención. Probablemente tienes más claridad de la que crees sobre lo que quieres.\n\nEl problema no es que no sepas hacia dónde ir. El problema es que tu vida diaria no está apuntando hacia ahí.\n\nHay una distancia — a veces pequeña, a veces enorme — entre lo que dices que importa y cómo usas realmente tu tiempo, tu atención y tu energía. Tu semana no refleja tus prioridades. Tus decisiones no reflejan tus valores. Y esa brecha no es pereza ni falta de disciplina.\n\nEs que una parte de ti sigue respondiendo a lo urgente, a lo que se espera, a lo que no puedes dejar de atender — mientras lo que realmente importa queda siempre para después.\n\nUna brújula sin norte no está rota. Sigue funcionando. Gira, se mueve, reacciona. Solo que no apunta a ningún lugar en particular. Y eso hace que todo el movimiento — por más esfuerzo que lleve — no te acerque a donde quieres llegar.',

    frena: 'Lo más agotador de este patrón no es el trabajo que haces. Es la sensación de que ese trabajo no te lleva a ningún lado real.\n\nTerminas el día cansado, con la lista hecha, con todo bajo control — y aun así con una incomodidad que no sabes bien cómo nombrar. Como si hubieras estado muy ocupado haciendo la vida del vecino.\n\nAparece cuando dices que la familia es lo primero — pero llevas semanas sin estar realmente presente con ellos. Cuando sabes exactamente qué tendrías que hacer para avanzar — y sin embargo sigues atendiendo lo que llega primero. Cuando te prometes que este lunes empieza el cambio — y el miércoles ya volviste al mismo ritmo de siempre.\n\nNo porque seas débil. Sino porque tus acciones están respondiendo a una versión de ti que ya no refleja quién quieres ser.',

    raiz: 'Los resultados que tienes hoy no son un accidente. Son el fruto exacto de cómo has venido siendo — de las decisiones pequeñas que tomas cada día, de lo que priorizas sin darte cuenta, de cómo reaccionas cuando la vida presiona.\n\nCambiar los resultados sin cambiar eso es como ajustar las manecillas del reloj esperando que cambie la hora real.',

    gancho: 'El resumen que acabas de leer muestra el patrón. Pero hay algo más profundo que este diagnóstico identifica — y que muy pocas personas logran ver sin ayuda.\n\nEn el diagnóstico completo encontrarás cuál es la emoción específica que está sosteniendo tu desconexión — porque detrás de cada brecha entre lo que valoras y cómo vives, hay una emoción que lleva años operando en silencio. Cuando la nombras con precisión, todo cambia.\n\nTambién encontrarás cómo este patrón está afectando a las personas más cercanas de maneras que probablemente aún no has podido ver con claridad, por qué todo lo que has intentado antes no ha funcionado — y no es lo que crees — y cuál es el punto exacto desde donde empieza el cambio real.',

    intentado: 'Probablemente ya intentaste organizarte mejor. Leer sobre productividad. Hacer listas. Levantarte más temprano. Tomar cursos. Comprometerte con nuevos hábitos.\n\nY funcionó — un tiempo. Luego todo volvió al punto de partida.\n\nNo porque los métodos fueran malos. Sino porque ningún método cambia el lugar desde donde actúas. Y mientras ese lugar siga siendo el mismo, cualquier herramienta nueva termina siendo usada por la misma persona de siempre.',

    emocion: 'Debajo de la desconexión casi siempre hay una culpa silenciosa. La sensación de que sabes lo que deberías estar haciendo — y no lo estás haciendo.\n\nEsa culpa no te mueve. Te paraliza. Y para escapar de la parálisis, tu sistema encuentra la salida más segura: mantenerse ocupado con lo que llega, con lo urgente, con lo que no requiere que te enfrentes a la brecha real.\n\nEs un círculo que se cierra solo. Y cuanto más tiempo pasa, más natural se siente — hasta que deja de sentirse como un problema y empieza a sentirse como tu forma de ser.',

    relaciones: 'Este patrón no vive solo en ti. Lo respiran quienes más cerca están — aunque nunca lo hayan nombrado así.\n\nTu pareja siente que estás pero no estás. Físicamente presente, mentalmente en otro lugar. Cumples, respondes, apareces — pero hay algo que no llega. Y con el tiempo esa distancia deja de parecer un problema puntual y empieza a sentirse como la temperatura normal de la relación.\n\nTus hijos — si los tienes — aprenden algo de ti que no elegiste enseñarles. Aprenden que hay cosas que siempre son más urgentes. Que papá o mamá aparece cuando puede. Que el amor se expresa cumpliendo, no estando. No porque no los ames. Sino porque una brújula sin norte no puede darles una dirección que ella misma no tiene.\n\nEn el trabajo o en tu negocio, las personas a tu alrededor toman decisiones basándose en señales que tú emites sin darte cuenta. Cuando no hay una dirección clara desde adentro, las decisiones se toman desde lo inmediato — y eso construye, ladrillo a ladrillo, resultados que no reflejan lo que realmente quieres construir.\n\nLo más difícil de este patrón no es lo que te hace a ti. Es lo que le hace a los que te aman — en silencio, sin que nadie lo nombre, sin que nadie sea el villano de la historia.',

    cierre: 'La brecha entre lo que valoras y cómo vives no se cierra con más disciplina. Se cierra cuando el ser desde el que actúas está alineado con lo que realmente importa. Cuando las decisiones pequeñas — las de cada día, las que nadie ve — ya no requieren esfuerzo para apuntar en la dirección correcta. Porque esa dirección ya vive adentro.\n\nEse es el trabajo. Y empieza por verte con claridad — exactamente lo que acabas de comenzar a hacer.',

    cta: 'Tu siguiente paso es cerrar la brecha entre quien eres y cómo vives. En el taller lo hacemos juntos.',
  },

  sa: {
    nombre:  'Árbol sin Raíz',
    color:   '#3E4A4F',
    colorL:  'rgba(62,74,79,0.35)',

    apertura: 'Afuera todo puede estar bien. Adentro, algo nunca termina de asentarse.',

    desc: 'No es que te falte carácter. No es que seas débil o inconstante.\n\nEs que aún no tienes un lugar interno desde donde pararte — un núcleo que se mantenga firme cuando el mundo externo presiona, cuestiona o desaprueba.\n\nSin ese núcleo, la estabilidad depende de lo que pasa afuera. Un comentario, una crítica, una mirada — y el piso se mueve. Una racha buena, un reconocimiento, alguien que confía en ti — y todo vuelve a su lugar.\n\nEl problema no es la reacción. El problema es que el origen de tu estabilidad no está en ti.\n\nUn árbol sin raíces puede ser hermoso. Puede crecer, dar frutos, verse fuerte. Pero cuando viene el viento — no el huracán, el viento normal de la vida — se dobla más de lo que debería. Y tiene que gastar una energía enorme en mantenerse de pie que un árbol con raíces profundas ni siquiera nota que usa.\n\nEsa energía que gastas en sostenerte — en gestionar lo que piensan, en anticipar reacciones, en ajustarte a los entornos — es energía que no está disponible para construir lo que quieres.',

    frena: 'Aparece en los momentos en que más necesitas estar entero.\n\nCuando alguien que respetas cuestiona una decisión que tomaste — y de repente ya no estás tan seguro. No porque tengan razón necesariamente. Sino porque su desaprobación pesa más que tu propio criterio.\n\nCuando reaccionas con tu pareja, tus hijos o alguien cercano de una manera que después no reconoces como tuya. Te preguntas de dónde salió eso. Qué pasó. Y la respuesta honesta es que no lo sabes — porque en ese momento no eras tú quien respondía. Era el miedo, la historia, el patrón aprendido.\n\nCuando empiezas algo con claridad y convicción — y un obstáculo, una crítica o un mal resultado es suficiente para que todo se derrumbe. No el proyecto. La certeza de que ibas por el camino correcto.\n\nLo más costoso de vivir sin raíces no es lo que pierdes afuera. Es que nunca puedes descansar adentro.',

    raiz: 'Los resultados que tienes hoy son el fruto de quien has venido siendo. Y quien has venido siendo se construyó, en gran parte, desde afuera hacia adentro — desde lo que aprendiste que debías ser, desde lo que recibiste o no recibiste, desde las voces que dijeron qué estaba bien y qué no.\n\nEso no es una falla. Es una historia. Y las historias pueden reescribirse. Pero solo desde adentro.',

    gancho: 'Lo que acabas de leer es el patrón visible. Lo que hay debajo es más específico — y más accionable.\n\nEn el diagnóstico completo encontrarás cuál es la emoción de fondo que mueve este patrón — porque debajo de la inestabilidad siempre hay una emoción primaria que lleva años gobernando desde las sombras. No la que crees. La real.\n\nTambién encontrarás cómo este patrón aparece en tus relaciones más cercanas de maneras que reconocerás de inmediato y que nunca habías podido nombrar así, por qué los intentos anteriores de cambiar no te dieron estabilidad real, y cuál es el primer paso concreto para empezar a construir desde el lugar correcto.',

    intentado: 'Probablemente buscaste claridad en libros, en terapia, en cursos de desarrollo personal. Tal vez encontraste marcos que tenían sentido. Momentos de lucidez donde todo parecía claro.\n\nY luego la vida presionó — una conversación difícil, un fracaso, una crítica — y el piso volvió a moverse.\n\nNo porque la herramienta fuera mala. Sino porque la comprensión intelectual no reemplaza al núcleo. Puedes entender perfectamente por qué un árbol necesita raíces — y seguir sin tenerlas.\n\nEl trabajo de construir identidad no ocurre leyendo sobre identidad. Ocurre en otro nivel.',

    emocion: 'Debajo de la inestabilidad de identidad casi siempre hay una de dos emociones — o ambas operando en capas.\n\nLa primera es la ansiedad difusa — esa sensación de fondo de que algo puede salir mal, de que hay que estar alerta, de que el mundo externo puede cambiar en cualquier momento. No es miedo a algo concreto. Es una tensión que no tiene nombre claro pero que siempre está ahí.\n\nLa segunda es la vergüenza — no la vergüenza de haber hecho algo malo, sino algo más profundo: la sensación de que hay algo en ti que, si los demás lo vieran realmente, no pasaría la prueba. Esa vergüenza es la que hace que necesites el reconocimiento externo para sentirte suficiente. Y la que hace que la crítica duela tanto más de lo que debería.\n\nNinguna de las dos se resuelve con más logros, más validación o más éxito. Porque no viven en lo que haces. Viven en lo que crees que eres.',

    relaciones: 'Este patrón tiene un costo particular en las relaciones más cercanas — precisamente porque son las más cercanas.\n\nCon tu pareja, la falta de un núcleo propio crea una dinámica silenciosa: o te fusionas con lo que el otro quiere para evitar el conflicto, o reaccionas de forma desproporcionada cuando sientes que tu identidad está siendo cuestionada. Pocas veces hay un punto medio estable. Y eso genera distancia — no porque no haya amor, sino porque no hay un "tú" sólido con quien el otro pueda relacionarse de manera predecible.\n\nCon tus hijos, el impacto es más sutil y más profundo. Los hijos no aprenden de lo que les dices. Aprenden de lo que ven. Y lo que ven es a un adulto que busca en el exterior la confirmación de que está bien — que ajusta su estado de ánimo según cómo reaccionan los demás, que tiene días donde todo fluye y días donde un comentario lo desequilibra todo. Sin saberlo, están aprendiendo que así es como funciona el mundo adulto. Que la estabilidad depende de afuera.\n\nCon tu equipo o las personas que lideras, la ausencia de un núcleo de identidad se traduce en decisiones inconsistentes. No porque no seas inteligente — sino porque sin una brújula interna clara, las decisiones se toman desde el estado de ánimo del momento, desde la presión del entorno, desde el miedo a equivocarse. Y eso genera desconfianza — no en ti como persona, sino en la dirección.\n\nLo que más duele de este patrón no es la inestabilidad que sientes tú. Es darte cuenta de que las personas que más amas están construyendo su mundo sobre un suelo que todavía no es firme.',

    cierre: 'Construir un núcleo de identidad no es un proceso intelectual. No se logra entendiendo mejor quién eres. Se logra habitando, poco a poco, un lugar interno desde donde actuar — que no dependa de lo que dicen, de lo que pasa, de si sale bien o sale mal.\n\nEse lugar existe. No hay que inventarlo. Hay que encontrarlo. Y ese es exactamente el trabajo que empieza aquí.',

    cta: 'Tu arquitectura empieza por construir identidad. En el taller trabajamos exactamente eso.',
  },

  c: {
    nombre:  'El Elefante Encadenado',
    color:   '#6B4E3D',
    colorL:  'rgba(107,78,61,0.3)',

    apertura: 'Tienes más fuerza de la que usas. Más capacidad de la que reclamas. Y en algún lugar adentro — lo sabes.',

    desc: 'Hay una historia que llevas contigo.\n\nNo la elegiste conscientemente. Fue llegando — en frases sueltas, en miradas, en lo que pasó cuando te atreviste y salió mal, en lo que aprendiste que debías esperar de ti mismo y de la vida.\n\nY con el tiempo esa historia dejó de sentirse como una historia. Empezó a sentirse como la verdad.\n\n"No soy de los que logran eso." "Yo no sirvo para esto." "Eso es para otros — para los que tienen lo que yo no tengo." "Si me va bien, algo va a salir mal después."\n\nNo lo dices en voz alta. Casi nunca. Pero opera. Opera en el momento en que estás a punto de dar el siguiente paso y algo te frena. Opera cuando llegas cerca de algo que realmente quieres y aparece — casi sin aviso — una razón para no seguir.\n\nEl elefante de circo más grande puede ser retenido por una cuerda delgada atada a una estaca pequeña. No porque la cuerda sea más fuerte que él. Sino porque aprendió, de pequeño, que no podía romperla. Y nunca volvió a intentarlo.\n\nLa cuerda ya no lo retiene. La creencia, sí.',

    frena: 'Este bloqueo es el más silencioso de los tres — y por eso el más costoso.\n\nNo hace ruido. No se anuncia. Llega como una incomodidad justo cuando las cosas empiezan a ir bien. Como una distracción que aparece exactamente cuando más necesitas enfoque. Como una decisión que tomas casi sin darte cuenta — y que te aleja del lugar al que decías querer llegar.\n\nAparece cuando algo empieza a salirte bien de verdad — y en lugar de seguir, buscas inconscientemente cómo complicarlo. No porque quieras el fracaso. Sino porque el éxito, en algún nivel profundo, se siente más peligroso que el fracaso conocido.\n\nAparece en la forma en que reaccionas cuando alguien cercano te reconoce, te celebra, te dice que mereces algo bueno. Hay una parte de ti que recibe eso con incomodidad. Que lo minimiza. Que busca la razón por la que no aplica en tu caso.\n\nY aparece en la pregunta que nunca te has hecho en voz alta:\n\n¿Quién te dijo que no podías? ¿Quién te dijo que no lo merecías? ¿Quién te dijo que eso no era para ti?\n\nPorque alguien lo dijo. O algo lo enseñó. Y tú — en el momento en que lo recibiste — no tenías otra opción que creerlo.\n\nHoy sí tienes otra opción. Pero primero hay que ver la cuerda.',

    raiz: 'Los resultados que tienes hoy son el fruto de quien has venido siendo. Y quien has venido siendo está construido, en parte, sobre creencias que no elegiste — sobre límites que otros trazaron y que con el tiempo se volvieron invisibles porque los integraste como tuyos.\n\nEl problema no es que seas limitado. El problema es que llevas años viviendo como si lo fueras.',

    gancho: 'Lo que acabas de leer es la superficie del patrón. Lo que hay debajo es más específico — y encontrarlo cambia todo.\n\nEn el diagnóstico completo encontrarás cuál es la creencia exacta que está operando en tu caso — no en general, sino la tuya. La que aparece en los momentos más importantes. La que tiene un origen concreto aunque nunca lo hayas rastreado.\n\nTambién encontrarás cómo esta creencia está afectando lo que construyes con las personas que más amas, por qué el esfuerzo y la voluntad solos no pueden con esto, y cuál es el primer movimiento real — no para eliminar la creencia de golpe, sino para dejar de vivir desde ella.',

    intentado: 'Probablemente intentaste el pensamiento positivo. Afirmaciones. Visualización. Tal vez terapia. Tal vez leíste sobre reprogramación mental, sobre neuroplasticidad, sobre cómo cambiar los patrones de pensamiento.\n\nY algo cambió — en la superficie. Aprendiste a reconocer el pensamiento negativo. A reemplazarlo. A no decirlo en voz alta.\n\nPero el patrón siguió operando. Porque las creencias limitantes no son pensamientos que puedes reemplazar con pensamientos mejores. Son predicciones que tu cerebro hace sobre el mundo — basadas en evidencia que lleva años acumulándose — y que filtran la realidad antes de que llegue a tu conciencia.\n\nNo es que pienses que no puedes. Es que tu sistema nervioso ha aprendido a operar como si no pudieras. Y eso no se cambia con voluntad. Se cambia trabajando en el nivel donde vive.',

    emocion: 'Debajo del Elefante Encadenado casi siempre operan dos emociones que rara vez se nombran juntas.\n\nLa primera es el miedo al éxito — que suena paradójico pero es uno de los patrones más comunes y menos reconocidos. No es miedo a fracasar. Es miedo a lo que pasa si realmente lo logras. A las expectativas que eso genera. A perder la identidad construida alrededor de la lucha. A que los demás cambien su relación contigo. A no saber quién eres sin el obstáculo.\n\nLa segunda es la vergüenza de origen — la sensación profunda, a veces preverbal, de que hay algo en ti que no está a la altura. No de una tarea específica. De la vida que quieres. Como si pedir eso fuera demasiado. Como si merecerlo requiriera ser alguien diferente de quien eres.\n\nEstas dos emociones no se resuelven entendiéndolas. Se resuelven habitándolas — acompañado, con las preguntas correctas, en el momento correcto.',

    relaciones: 'Este bloqueo tiene un efecto particular en las relaciones — porque opera desde adentro hacia afuera, de maneras que las personas más cercanas sienten pero rara vez pueden nombrar.\n\nCon tu pareja, el Elefante Encadenado aparece en la distancia que pones cuando la relación se pone demasiado buena. Cuando hay demasiada cercanía, demasiada vulnerabilidad, demasiado en juego — y algo en ti empieza a crear fricción sin razón aparente. No porque no quieras la relación. Sino porque una parte de ti no cree que mereces tenerla así de bien. Y prefiere romperla antes de que el otro descubra que no eras suficiente.\n\nCon tus hijos, lo que transmites no es la creencia — es el techo. Los hijos crecen con una noción implícita de hasta dónde se puede llegar, formada en gran parte por lo que ven en sus padres. Cuando un padre vive encadenado a sus propios límites — cuando se frena justo antes, cuando minimiza sus logros, cuando reacciona con incomodidad ante el éxito propio o ajeno — eso se convierte en el techo invisible de los hijos. No por lo que les dice. Por lo que les muestra.\n\nCon las personas que te rodean en el trabajo, este patrón genera inconsistencia. Arranques brillantes seguidos de frenos inexplicables. Proyectos que llegan al 80% y se quedan ahí. No por falta de capacidad — sino porque el 80% es el límite donde la creencia empieza a activarse. Donde el éxito real empieza a sentirse peligroso.\n\nLa cuerda que te retiene no es tuya. Alguien te la puso. En un momento en que no podías cuestionarla, no podías resistirla, no tenías otra opción que creerla. Hoy puedes cuestionarla. Pero primero tienes que verla — con claridad, con nombre, con origen. Eso es lo que muy pocas personas logran hacer solas.',

    cierre: 'Las creencias que te limitan no se disuelven con información. No se reemplazan con afirmaciones. No se superan con esfuerzo.\n\nSe transforman cuando puedes verlas desde afuera — cuando dejan de ser "la verdad sobre ti" y se convierten en "algo que alguien te enseñó a creer".\n\nEse momento de ver — claro, sin defensa, sin drama — es el inicio de todo lo demás. Y es exactamente el trabajo que hacemos en la Arquitectura del Ser.',

    cta: 'Lo que te frena no es externo. En el taller vamos directo a la raíz — las creencias que aún no has visto.',
  },
};

// ── NUDOS ─────────────────────────────────────────────────────────
var NUDOS = {
  'sa-d': 'Sin un núcleo interno desde donde pararte, es casi imposible alinearte con lo que realmente valoras. Por eso sientes que te esfuerzas — pero al final del día, no avanzaste en lo que importa. Tu energía existe. Tu dirección, todavía no.',
  'sa-c': 'Cuando no hay un centro claro de identidad, las creencias limitantes llenan ese vacío. Se vuelven parte de "lo que eres" — y cuestionarlas se siente como cuestionarte a ti mismo. Por eso son tan difíciles de ver: no parecen creencias. Parecen hechos.',
  'd-c':  'La brecha entre lo que valoras y cómo actúas se sostiene por lo que crees que mereces. Si en el fondo no crees que lo bueno es para ti, tu comportamiento lo confirma silenciosamente todos los días — sin que nadie lo note, sin que nadie sea el villano. Solo el patrón, repitiéndose.',
};

// ── ILUSTRACIONES SVG ─────────────────────────────────────────────
var ILUSTRACIONES = {

  // Árbol sin Raíz — árbol que se dobla con el viento, raíces superficiales expuestas
  sa: '<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="gsa-trunk" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#3E4A4F" stop-opacity="0.9"/>' +
        '<stop offset="100%" stop-color="#3E4A4F" stop-opacity="0.5"/>' +
      '</linearGradient>' +
    '</defs>' +
    // Suelo
    '<line x1="20" y1="195" x2="280" y2="195" stroke="#7A7A75" stroke-width="1" opacity="0.4"/>' +
    // Raíces superficiales expuestas — frágiles, no profundas
    '<path d="M148 195 Q130 200 110 198 Q95 197 85 205" stroke="#3E4A4F" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/>' +
    '<path d="M148 195 Q155 205 165 210 Q175 213 190 208" stroke="#3E4A4F" stroke-width="2" fill="none" opacity="0.4" stroke-linecap="round"/>' +
    '<path d="M140 200 Q128 212 118 218" stroke="#3E4A4F" stroke-width="1.5" fill="none" opacity="0.3" stroke-linecap="round"/>' +
    '<path d="M155 202 Q168 216 176 222" stroke="#3E4A4F" stroke-width="1.5" fill="none" opacity="0.3" stroke-linecap="round"/>' +
    // Raíces que deberían ir profundo pero no llegan
    '<path d="M145 195 Q143 220 144 235" stroke="#7A7A75" stroke-width="1" fill="none" opacity="0.2" stroke-dasharray="3 3"/>' +
    '<path d="M152 195 Q154 218 153 232" stroke="#7A7A75" stroke-width="1" fill="none" opacity="0.2" stroke-dasharray="3 3"/>' +
    // Tronco inclinado por el viento
    '<path d="M148 195 Q155 160 168 125 Q178 95 185 65" stroke="url(#gsa-trunk)" stroke-width="14" fill="none" stroke-linecap="round"/>' +
    // Ramas principales — dobladas por el viento
    '<path d="M175 95 Q205 75 225 55 Q240 40 255 28" stroke="#3E4A4F" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>' +
    '<path d="M180 115 Q210 105 235 95 Q250 88 262 78" stroke="#3E4A4F" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>' +
    '<path d="M170 80 Q185 55 195 35 Q202 20 208 10" stroke="#3E4A4F" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.65"/>' +
    '<path d="M178 130 Q200 125 218 118" stroke="#3E4A4F" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.45"/>' +
    // Copa — hojas dispersas por el viento hacia la derecha
    '<ellipse cx="238" cy="48" rx="28" ry="22" fill="#3E4A4F" opacity="0.35"/>' +
    '<ellipse cx="255" cy="30" rx="22" ry="18" fill="#3E4A4F" opacity="0.28"/>' +
    '<ellipse cx="245" cy="85" rx="20" ry="16" fill="#3E4A4F" opacity="0.25"/>' +
    '<ellipse cx="205" cy="18" rx="16" ry="14" fill="#3E4A4F" opacity="0.22"/>' +
    // Hojas sueltas volando — perdiendo su copa
    '<ellipse cx="270" cy="60" rx="8" ry="5" fill="#3E4A4F" opacity="0.2" transform="rotate(-20,270,60)"/>' +
    '<ellipse cx="285" cy="40" rx="6" ry="4" fill="#3E4A4F" opacity="0.15" transform="rotate(-30,285,40)"/>' +
    '<ellipse cx="278" cy="95" rx="5" ry="3" fill="#3E4A4F" opacity="0.12" transform="rotate(-10,278,95)"/>' +
    // Líneas de viento
    '<path d="M20 80 Q50 75 80 80" stroke="#7A7A75" stroke-width="1" fill="none" opacity="0.2" stroke-dasharray="4 4"/>' +
    '<path d="M15 105 Q40 100 65 105" stroke="#7A7A75" stroke-width="1" fill="none" opacity="0.15" stroke-dasharray="4 4"/>' +
  '</svg>',

  // Brújula sin Norte — brújula con aguja inestable, sin punto fijo
  d: '<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="gd-dial" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2F2F2F" stop-opacity="1"/>' +
        '<stop offset="100%" stop-color="#1a1a1a" stop-opacity="1"/>' +
      '</linearGradient>' +
    '</defs>' +
    // Cuerpo de la brújula
    '<circle cx="150" cy="118" r="88" fill="none" stroke="#B8A08C" stroke-width="1.5" opacity="0.4"/>' +
    '<circle cx="150" cy="118" r="82" fill="url(#gd-dial)" opacity="0.9"/>' +
    '<circle cx="150" cy="118" r="82" fill="none" stroke="#B8A08C" stroke-width="0.5" opacity="0.2"/>' +
    // Marcas cardinales — todas iguales, ninguna destacada como Norte
    '<text x="150" y="48" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="13" font-weight="500" fill="#7A7A75" opacity="0.6">N</text>' +
    '<text x="150" y="200" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="13" font-weight="500" fill="#7A7A75" opacity="0.6">S</text>' +
    '<text x="76" y="123" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="13" font-weight="500" fill="#7A7A75" opacity="0.6">O</text>' +
    '<text x="228" y="123" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="13" font-weight="500" fill="#7A7A75" opacity="0.6">E</text>' +
    // Marcas de grados — círculo completo
    '<circle cx="150" cy="44" r="2" fill="#7A7A75" opacity="0.25"/>' +
    '<circle cx="212" cy="62" r="1.5" fill="#7A7A75" opacity="0.2"/>' +
    '<circle cx="232" cy="118" r="2" fill="#7A7A75" opacity="0.25"/>' +
    '<circle cx="212" cy="174" r="1.5" fill="#7A7A75" opacity="0.2"/>' +
    '<circle cx="88" cy="62" r="1.5" fill="#7A7A75" opacity="0.2"/>' +
    '<circle cx="68" cy="118" r="2" fill="#7A7A75" opacity="0.25"/>' +
    '<circle cx="88" cy="174" r="1.5" fill="#7A7A75" opacity="0.2"/>' +
    // Agujas múltiples — representan la indecisión, ninguna apunta fijo
    '<line x1="150" y1="118" x2="182" y2="58" stroke="#B8A08C" stroke-width="2" opacity="0.2" stroke-linecap="round"/>' +
    '<line x1="150" y1="118" x2="210" y2="88" stroke="#B8A08C" stroke-width="1.5" opacity="0.15" stroke-linecap="round"/>' +
    '<line x1="150" y1="118" x2="195" y2="148" stroke="#B8A08C" stroke-width="1.5" opacity="0.12" stroke-linecap="round"/>' +
    // Aguja principal — apunta a un lugar indefinido, no al Norte
    '<line x1="150" y1="118" x2="195" y2="62" stroke="#B8A08C" stroke-width="3" opacity="0.7" stroke-linecap="round"/>' +
    '<polygon points="195,62 188,72 202,72" fill="#B8A08C" opacity="0.7"/>' +
    // Cola de la aguja
    '<line x1="150" y1="118" x2="118" y2="158" stroke="#7A7A75" stroke-width="2" opacity="0.4" stroke-linecap="round"/>' +
    // Centro
    '<circle cx="150" cy="118" r="7" fill="#B8A08C" opacity="0.5"/>' +
    '<circle cx="150" cy="118" r="3" fill="#D9D6CF" opacity="0.7"/>' +
    // Texto sutil
    '<text x="150" y="228" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="10" fill="#7A7A75" opacity="0.5" letter-spacing="0.1em">sin rumbo fijo</text>' +
  '</svg>',

  // Elefante Encadenado — figura de elefante con cadena a estaca pequeña
  c: '<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="gc-body" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#6B4E3D" stop-opacity="0.9"/>' +
        '<stop offset="100%" stop-color="#4a3028" stop-opacity="0.8"/>' +
      '</linearGradient>' +
      '<linearGradient id="gc-shadow" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#6B4E3D" stop-opacity="0.3"/>' +
        '<stop offset="100%" stop-color="#6B4E3D" stop-opacity="0"/>' +
      '</linearGradient>' +
    '</defs>' +
    // Sombra suelo
    '<ellipse cx="148" cy="215" rx="90" ry="12" fill="url(#gc-shadow)"/>' +
    // Suelo
    '<line x1="20" y1="210" x2="280" y2="210" stroke="#7A7A75" stroke-width="1" opacity="0.3"/>' +
    // Patas traseras
    '<rect x="170" y="168" width="24" height="44" rx="10" fill="url(#gc-body)"/>' +
    '<rect x="200" y="172" width="22" height="40" rx="10" fill="url(#gc-body)" opacity="0.8"/>' +
    // Patas delanteras
    '<rect x="82" y="165" width="24" height="46" rx="10" fill="url(#gc-body)"/>' +
    '<rect x="112" y="168" width="22" height="44" rx="10" fill="url(#gc-body)" opacity="0.85"/>' +
    // Cuerpo principal
    '<ellipse cx="150" cy="155" rx="80" ry="52" fill="url(#gc-body)"/>' +
    // Cabeza
    '<ellipse cx="85" cy="128" rx="42" ry="38" fill="url(#gc-body)"/>' +
    // Oreja
    '<ellipse cx="62" cy="118" rx="22" ry="28" fill="#6B4E3D" opacity="0.6"/>' +
    '<ellipse cx="65" cy="120" rx="14" ry="20" fill="#4a3028" opacity="0.4"/>' +
    // Ojo
    '<circle cx="78" cy="118" r="5" fill="#2F2F2F"/>' +
    '<circle cx="78" cy="118" r="2.5" fill="#D9D6CF" opacity="0.3"/>' +
    // Trompa que cuelga — sin energía, hacia abajo
    '<path d="M68 145 Q52 162 48 178 Q45 190 55 195" stroke="#6B4E3D" stroke-width="14" fill="none" stroke-linecap="round"/>' +
    '<path d="M68 145 Q52 162 48 178 Q45 190 55 195" stroke="#4a3028" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.5"/>' +
    // Colmillos pequeños
    '<path d="M72 148 Q60 155 58 165" stroke="#D9D6CF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.4"/>' +
    // Cola
    '<path d="M228 148 Q242 155 238 168 Q235 178 242 182" stroke="#6B4E3D" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.6"/>' +
    // Cadena — va desde la pata trasera derecha hasta la estaca
    '<line x1="224" y1="205" x2="262" y2="205" stroke="#B8A08C" stroke-width="2.5" stroke-dasharray="5 3" opacity="0.7"/>' +
    // Eslabones de la cadena
    '<circle cx="232" cy="205" r="3" stroke="#B8A08C" stroke-width="1.5" fill="none" opacity="0.6"/>' +
    '<circle cx="242" cy="205" r="3" stroke="#B8A08C" stroke-width="1.5" fill="none" opacity="0.6"/>' +
    '<circle cx="252" cy="205" r="3" stroke="#B8A08C" stroke-width="1.5" fill="none" opacity="0.6"/>' +
    // Estaca pequeña — ridículamente pequeña para el tamaño del elefante
    '<rect x="258" y="195" width="8" height="20" rx="2" fill="#B8A08C" opacity="0.6"/>' +
    '<polygon points="258,195 266,195 262,188" fill="#B8A08C" opacity="0.6"/>' +
    // Anillo en la pata
    '<ellipse cx="182" cy="208" rx="10" ry="4" stroke="#B8A08C" stroke-width="1.5" fill="none" opacity="0.5"/>' +
  '</svg>',
};
