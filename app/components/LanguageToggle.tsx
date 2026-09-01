"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Language = "pt" | "en" | "es";

const englishPairs: Record<string, string> = {
  ATMCentre: "ATMCentre", Plataforma: "Platform", Benefícios: "Benefits", Módulos: "Modules", Contato: "Contact",
  "Fale com um especialista": "Talk to a specialist", "Avalie sua operação": "Assess your operation",
  "Gestão inteligente de terminais": "Intelligent terminal management",
  "Controle toda a sua rede de autoatendimento em uma": "Control your entire self-service network on a",
  "única plataforma": "single platform",
  "Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.": "Monitor terminals, manage transactions and evolve your operation with greater availability, security and technological independence.",
  "A Tolar é um": "Tolar is a", "spin-off da HST Card Technology": "spin-off of HST Card Technology",
  "empresa com mais de 35 anos de experiência em pagamentos, terminais e infraestrutura de autoatendimento.": "a company with more than 35 years of experience in payments, terminals and self-service infrastructure.",
  "Uma plataforma para toda a sua rede de autoatendimento.": "One platform for your entire self-service network.",
  "O ATMCentre conecta e supervisiona ATMs, cofres inteligentes e outros dispositivos de autoatendimento em um único ambiente. Uma base única para acompanhar sua rede com independência tecnológica.": "ATMCentre connects and supervises ATMs, smart safes and other self-service devices in one environment. A single foundation for monitoring your network with technological independence.",
  "Cofres inteligentes": "Smart safes", "Dispositivos conectados": "Connected devices", "Conheça o ATMCentre": "Explore ATMCentre", "Imagem de ATMs e cofres inteligentes": "Image of ATMs and smart safes",
  "Do produto ao resultado": "From product to outcome",
  "Mais controle na operação. Mais confiança para decidir.": "More control in operations. More confidence to decide.",
  "Com o ATMCentre, dados de terminais, transações e dispositivos se transformam em uma visão acionável da operação. Sua equipe monitora a rede, responde com mais agilidade e toma decisões com mais segurança.": "With ATMCentre, terminal, transaction and device data becomes an actionable view of operations. Your team monitors the network, responds faster and makes decisions with greater confidence.",
  "Presente em operações que não podem parar": "Present in operations that cannot stop",
  Certificações: "Certifications", "Garantia de segurança e confiança nas transações digitais": "Security and confidence in digital transactions",
  "EMVCo Kernel": "EMVCo Kernel", "PCI SFF": "PCI SFF",
  "Do terminal à estratégia": "From terminal to strategy",
  "Da resposta imediata à decisão estratégica.": "From immediate response to strategic decision-making.",
  "Saiba o que acontece em cada terminal": "Know what is happening at every terminal",
  "Acompanhe eventos, transações e disponibilidade da rede em tempo real.": "Track events, transactions and network availability in real time.",
  "Integre diferentes fabricantes": "Integrate different manufacturers",
  "Gerencie equipamentos de diferentes fornecedores em uma única solução.": "Manage equipment from different suppliers in a single solution.",
  "Resolva mais problemas à distância": "Solve more problems remotely",
  "Identifique incidentes, acione respostas e reduza deslocamentos desnecessários.": "Identify incidents, trigger responses and reduce unnecessary travel.",
  "Transforme dados em decisões melhores": "Turn data into better decisions",
  "Tenha uma visão consolidada da operação para priorizar ações e reduzir custos.": "Get a consolidated view of operations to prioritize actions and reduce costs.",
  "Mais controle para a sua operação": "More control for your operation",
  "Uma plataforma para acompanhar a complexidade da": "A platform to manage the complexity of",
  "sua operação": "your operation",
  "Uma plataforma para acompanhar a complexidade da sua operação": "A platform to manage the complexity of your operation",
  "Multi-vendor": "Multi-vendor", "Conecte equipamentos de diferentes fabricantes em uma única solução.": "Connect equipment from different manufacturers in a single solution.",
  "Multi-dispositivo": "Multi-device", "Gerencie diferentes modelos de terminais e dispositivos de forma centralizada.": "Manage different terminal models and devices centrally.",
  "Segurança e conformidade": "Security and compliance", "Conte com suporte aos padrões de segurança exigidos pelo mercado de pagamentos.": "Rely on support for security standards required by the payments market.",
  "Escalabilidade": "Scalability", "Expanda sua rede sem aumentar a complexidade da gestão.": "Expand your network without increasing management complexity.",
  "Flexibilidade de implantação": "Deployment flexibility", "Escolha entre SaaS e On-Premises de acordo com os requisitos do seu negócio.": "Choose SaaS or On-Premises according to your business requirements.",
  "Gestão centralizada": "Centralized management", "Acompanhe terminais, dispositivos e organizações em um único ambiente.": "Monitor terminals, devices and organizations in one environment.",
  "Pronto para evoluir sua operação?": "Ready to evolve your operation?",
  "Descubra como a Tolar pode conectar seus terminais, simplificar a gestão e preparar sua rede para crescer com mais controle.": "Discover how Tolar can connect your terminals, simplify management and prepare your network to grow with more control.",
  "Um ecossistema conectado": "A connected ecosystem", "Combine os módulos que sua operação precisa.": "Combine the modules your operation needs.",
  "Evolua sua infraestrutura com flexibilidade. Combine módulos conforme os desafios da sua rede e amplie as possibilidades de autoatendimento ao longo do tempo.": "Evolve your infrastructure with flexibility. Combine modules around your network's challenges and expand self-service capabilities over time.",
  "Conheça a plataforma": "Explore the platform", "Experiência comprovada em escala": "Proven experience at scale", "Experiência para operar em escala": "Experience to operate at scale",
  "Clientes utilizando nossos serviços": "Clients using our services", "Países em 3 continentes": "Countries across 3 continents", "Anos de experiência em pagamentos": "Years of experience in payments", "Principais bancos da América Latina": "Leading banks in Latin America",
  "Entenda como a Tolar pode simplificar sua operação": "See how Tolar can simplify your operation", "Fale com nosso time e descubra quais módulos fazem sentido para o cenário da sua empresa.": "Talk to our team and discover which modules fit your company's needs.",
  "Spin-off da HST Card Technology, com mais de 35 anos de experiência no ecossistema de autoatendimento": "HST Card Technology spin-off, with more than 35 years of experience in the self-service ecosystem",
  "Preencha o formulário e nossa equipe entrará em contato para entender sua operação e apresentar a melhor configuração para o seu cenário.": "Fill out the form and our team will contact you to understand your operation and present the best configuration for your needs.",
  Nome: "Name", "E-mail corporativo": "Business email", Empresa: "Company", Telefone: "Phone", "Seu nome": "Your name", "nome@empresa.com": "name@company.com", "Nome da empresa": "Company name", "(00) 00000-0000": "(00) 00000-0000",
  "© 2026 Tolar. Todos os direitos reservados.": "© 2026 Tolar. All rights reserved.",
  "Gestão inteligente para operações de autoatendimento mais seguras, disponíveis e escaláveis.": "Intelligent management for safer, more available and scalable self-service operations.",
  Explorar: "Explore", Início: "Home", "contato@tolar.com.br": "contato@tolar.com.br", Topo: "Top",
  "HST Card Technology": "HST Card Technology",
  "Privacidade e proteção de dados": "Privacy and data protection", "Política de Privacidade": "Privacy Policy", "Armazenamento de dados e cookies": "Data and cookie storage", "Introdução": "Introduction", "Por que coletamos os dados?": "Why do we collect data?", "Onde ficam armazenados?": "Where is it stored?", "Como a Tolar utiliza os Cookies?": "How does Tolar use Cookies?", "Como a HST utiliza os Cookies?": "How does Tolar use Cookies?", "Como funciona a visualização de conteúdo externo?": "How does external content work?", "Visualização de conteúdo de ferramentas externas": "Viewing content from external tools", "Gerenciamento de tags": "Tag management", "Linguagem de acesso": "Access language", "Cookies de análise de comportamento da navegação": "Navigation behavior analysis cookies", "Google Analytics": "Google Analytics", "Cookies para publicidade são usados da seguinte forma:": "Advertising cookies are used as follows:", "Google Analytics e Google Ads – Exibição de publicidade": "Google Analytics and Google Ads – Advertising", "Facebook – Exibição de publicidade": "Facebook – Advertising", "LinkedIn – Exibição de publicidade": "LinkedIn – Advertising", "Lei aplicável e resolução de conflitos": "Applicable law and dispute resolution", "Extensão dos efeitos": "Scope", "Informações sobre seus direitos": "Information about your rights", "Data Privacy Officer": "Data Privacy Officer", "Voltar ao site": "Back to site",
  "Com o consentimento do usuário que estiver acessando as informações no site da Tolar, e de acordo com nossas políticas de privacidade, coletamos dados pessoais destes usuários através dos formulários que são preenchidos no site. Os dados pedidos pela Tolar têm o objetivo de conhecer novos parceiros de negócio da Tolar, ou potenciais clientes ou ainda realizar a triagem de currículos para a contratação de colaboradores que estejam interessados nas vagas oferecidas pela Tolar.": "With the consent of users accessing information on the Tolar website, and in accordance with our privacy policies, we collect their personal data through forms submitted on the site. The data requested by Tolar helps us identify new business partners, potential customers, and candidates interested in open positions.",
  "Para que um usuário possa fazer um download de uma apresentação resumida das soluções da Tolar, criamos formulários que coletam as informações pessoais dos usuários como: nome, e-mail, material acessado, idioma. Isto é feito para que possamos encaminhar outros informativos sobre soluções da Tolar e, eventualmente, criar relações comerciais.": "To allow users to download a summary presentation of Tolar solutions, we use forms that collect personal information such as name, email, material accessed, and language. This allows us to send information about Tolar solutions and, when appropriate, establish business relationships.",
  "Os dados coletados são armazenados por período indeterminado na plataforma registrada pela empresa The Rocket Science Group (“Mailchimp”), com sede nos Estados Unidos, e está de acordo com GDPR (General Data Protection Regulation) e demais legislações aplicáveis ao tratamento de dados pessoais.": "Collected data is stored for an indefinite period on the platform operated by The Rocket Science Group (“Mailchimp”), headquartered in the United States, in accordance with GDPR (General Data Protection Regulation) and other applicable data-protection laws.",
  "Como controladores dos dados, restringimos o acesso apenas aos funcionários e parceiros de negócios que possam contactá-lo e possam propor ou comunicar informações adicionais sobre produtos e serviços de forma personalizada.": "As data controllers, we restrict access to employees and business partners who may contact you or provide personalized information about products and services.",
  "Criamos formulários destinados para envio de currículos de pessoas que desejam participar do processo seletivo da Tolar. Antes de enviar qualquer dado ou documento a pessoa deve concordar com a política de privacidade do site. Os dados enviados nos permitem entrar em contato para oportunidades de empregos de acordo com a inscrição realizada.": "We provide forms for submitting resumes from people who wish to participate in Tolar's selection process. Before submitting any data or document, applicants must agree to the site's privacy policy. The information submitted allows us to contact applicants about opportunities related to their application.",
  "Utilizamos cookies, que coletam informações de navegação do Browser sobre os usuários apenas como indicador, assim podemos melhorar continuamente a experiência da pessoa que está acessando o site e agilizar a busca das informações de forma mais rápida e eficiente. Não obtemos acessos a dados pessoais em cookies.": "We use cookies that collect browser-navigation information as indicators, helping us continuously improve the experience and make information faster and easier to find. Cookies do not provide us with access to personal data.",
  "Realizamos a coleta dos conjuntos de dados para reconhecer e analisar comportamentos de usabilidade, utilização de dispositivos (celular, tablet e computador) e realizar publicidades personalizadas.": "We collect data sets to recognize and analyze usability behavior and device usage (mobile, tablet, and computer), and to deliver personalized advertising.",
  "Toda e qualquer controvérsia oriunda dos termos expostos na presente Política de Privacidade serão solucionados de acordo com a lei brasileira LGPD, sendo competente o foro da cidade de São Paulo, SP, Comarca da Capital, com exclusão de qualquer outro por mais privilegiado que seja.": "Any dispute arising from this Privacy Policy will be resolved under Brazilian law and the LGPD, with the courts of São Paulo, SP, Capital District, having exclusive jurisdiction.",
  "Os termos da Política de Privacidade aqui expostos serão aplicados exclusivamente às informações pessoais, conforme acima definido, que venham a ser disponibilizadas no site da Tolar.": "The terms of this Privacy Policy apply exclusively to personal information, as defined above, that is made available on the Tolar website.",
  "Por consequência, a Política de Privacidade aqui exposta não será aplicável a qualquer outro serviço disponibilizado pela Tolar.": "Accordingly, this Privacy Policy does not apply to any other service provided by Tolar.",
};

const spanishPairs: Record<string, string> = {
  ATMCentre: "ATMCentre", Plataforma: "Plataforma", Benefícios: "Beneficios", Módulos: "Módulos", Contato: "Contacto",
  "Fale com um especialista": "Hable con un especialista", "Avalie sua operação": "Evalúe su operación",
  "Gestão inteligente de terminais": "Gestión inteligente de terminales",
  "Controle toda a sua rede de autoatendimento em uma": "Controle toda su red de autoservicio en una",
  "única plataforma": "única plataforma",
  "Monitore terminais, gerencie transações e evolua sua operação com mais disponibilidade, segurança e independência tecnológica.": "Supervise terminales, gestione transacciones y haga evolucionar su operación con mayor disponibilidad, seguridad e independencia tecnológica.",
  "A Tolar é um": "Tolar es una", "spin-off da HST Card Technology": "spin-off de HST Card Technology",
  "empresa com mais de 35 anos de experiência em pagamentos, terminais e infraestrutura de autoatendimento.": "empresa con más de 35 años de experiencia en pagos, terminales e infraestructura de autoservicio.",
  "Uma plataforma para toda a sua rede de autoatendimento.": "Una plataforma para toda su red de autoservicio.",
  "O ATMCentre conecta e supervisiona ATMs, cofres inteligentes e outros dispositivos de autoatendimento em um único ambiente. Uma base única para acompanhar sua rede com independência tecnológica.": "ATMCentre conecta y supervisa cajeros automáticos, cajas fuertes inteligentes y otros dispositivos de autoservicio en un único entorno. Una base única para monitorear su red con independencia tecnológica.",
  "Cofres inteligentes": "Cajas fuertes inteligentes", "Dispositivos conectados": "Dispositivos conectados", "Conheça o ATMCentre": "Conozca ATMCentre", "Imagem de ATMs e cofres inteligentes": "Imagen de cajeros automáticos y cajas fuertes inteligentes",
  "Do produto ao resultado": "Del producto al resultado",
  "Mais controle na operação. Mais confiança para decidir.": "Más control en la operación. Más confianza para decidir.",
  "Com o ATMCentre, dados de terminais, transações e dispositivos se transformam em uma visão acionável da operação. Sua equipe monitora a rede, responde com mais agilidade e toma decisões com mais segurança.": "Con ATMCentre, los datos de terminales, transacciones y dispositivos se convierten en una visión accionable de la operación. Su equipo monitorea la red, responde con más agilidad y toma decisiones con mayor seguridad.",
  "Presente em operações que não podem parar": "Presente en operaciones que no pueden detenerse",
  Certificações: "Certificaciones", "Garantia de segurança e confiança nas transações digitais": "Seguridad y confianza en las transacciones digitales",
  "Do terminal à estratégia": "Del terminal a la estrategia", "Da resposta imediata à decisão estratégica.": "De la respuesta inmediata a la decisión estratégica.",
  "Saiba o que acontece em cada terminal": "Sepa qué ocurre en cada terminal", "Acompanhe eventos, transações e disponibilidade da rede em tempo real.": "Siga eventos, transacciones y disponibilidad de la red en tiempo real.",
  "Integre diferentes fabricantes": "Integre diferentes fabricantes", "Gerencie equipamentos de diferentes fornecedores em uma única solução.": "Gestione equipos de distintos proveedores en una única solución.",
  "Resolva mais problemas à distância": "Resuelva más problemas a distancia", "Identifique incidentes, acione respostas e reduza deslocamentos desnecessários.": "Identifique incidencias, active respuestas y reduzca desplazamientos innecesarios.",
  "Transforme dados em decisões melhores": "Transforme datos en mejores decisiones", "Tenha uma visão consolidada da operação para priorizar ações e reduzir custos.": "Tenga una visión consolidada de la operación para priorizar acciones y reducir costos.",
  "Mais controle para a sua operação": "Más control para su operación", "Uma plataforma para acompanhar a complexidade da": "Una plataforma para acompañar la complejidad de la", "sua operação": "su operación",
  "Uma plataforma para acompanhar a complexidade da sua operação": "Una plataforma para acompañar la complejidad de su operación",
  "Conecte equipamentos de diferentes fabricantes em uma única solução.": "Conecte equipos de diferentes fabricantes en una única solución.",
  "Gerencie diferentes modelos de terminais e dispositivos de forma centralizada.": "Gestione diferentes modelos de terminales y dispositivos de forma centralizada.",
  "Segurança e conformidade": "Seguridad y cumplimiento", "Conte com suporte aos padrões de segurança exigidos pelo mercado de pagamentos.": "Cuente con soporte para los estándares de seguridad exigidos por el mercado de pagos.",
  Escalabilidade: "Escalabilidad", "Expanda sua rede sem aumentar a complexidade da gestão.": "Amplíe su red sin aumentar la complejidad de gestión.",
  "Flexibilidade de implantação": "Flexibilidad de implementación", "Escolha entre SaaS e On-Premises de acordo com os requisitos do seu negócio.": "Elija entre SaaS y On-Premises de acuerdo con las necesidades de su negocio.",
  "Gestão centralizada": "Gestión centralizada", "Acompanhe terminais, dispositivos e organizações em um único ambiente.": "Supervise terminales, dispositivos y organizaciones en un único entorno.",
  "Pronto para evoluir sua operação?": "¿Listo para evolucionar su operación?", "Descubra como a Tolar pode conectar seus terminais, simplificar a gestão e preparar sua rede para crescer com mais controle.": "Descubra cómo Tolar puede conectar sus terminales, simplificar la gestión y preparar su red para crecer con más control.",
  "Um ecossistema conectado": "Un ecosistema conectado", "Combine os módulos que sua operação precisa.": "Combine los módulos que necesita su operación.",
  "Evolua sua infraestrutura com flexibilidade. Combine módulos conforme os desafios da sua rede e amplie as possibilidades de autoatendimento ao longo do tempo.": "Evolucione su infraestructura con flexibilidad. Combine módulos según los desafíos de su red y amplíe las posibilidades de autoservicio con el tiempo.",
  "Conheça a plataforma": "Conozca la plataforma", "Experiência comprovada em escala": "Experiencia comprobada a escala", "Experiência para operar em escala": "Experiencia para operar a escala",
  "Clientes utilizando nossos serviços": "Clientes que utilizan nuestros servicios", "Países em 3 continentes": "Países en 3 continentes", "Anos de experiência em pagamentos": "Años de experiencia en pagos", "Principais bancos da América Latina": "Principales bancos de América Latina",
  "Entenda como a Tolar pode simplificar sua operação": "Entienda cómo Tolar puede simplificar su operación", "Fale com nosso time e descubra quais módulos fazem sentido para o cenário da sua empresa.": "Hable con nuestro equipo y descubra qué módulos se adaptan a su empresa.",
  "Preencha o formulário e nossa equipe entrará em contato para entender sua operação e apresentar a melhor configuração para o seu cenário.": "Complete el formulario y nuestro equipo se pondrá en contacto para entender su operación y presentar la mejor configuración.",
  Nome: "Nombre", "E-mail corporativo": "Correo corporativo", Empresa: "Empresa", Telefone: "Teléfono", "Seu nome": "Su nombre", "nome@empresa.com": "nombre@empresa.com", "Nome da empresa": "Nombre de la empresa",
  "© 2026 Tolar. Todos os direitos reservados.": "© 2026 Tolar. Todos los derechos reservados.",
  "Gestão inteligente para operações de autoatendimento mais seguras, disponíveis e escaláveis.": "Gestión inteligente para operaciones de autoservicio más seguras, disponibles y escalables.",
  Explorar: "Explorar", Início: "Inicio", Topo: "Inicio", "Privacidade e proteção de dados": "Privacidad y protección de datos", "Política de Privacidade": "Política de Privacidad", "Voltar ao site": "Volver al sitio",
  Introdução: "Introducción", "Por que coletamos os dados?": "¿Por qué recopilamos los datos?", "Onde ficam armazenados?": "¿Dónde se almacenan?",
  "Com o consentimento do usuário que estiver acessando as informações no site da HST, e de acordo com nossas políticas de privacidade, coletamos dados pessoais destes usuários através dos formulários que são preenchidos no site. Os dados pedidos pela HST têm o objetivo de conhecer novos parceiros de negócio da HST, ou potenciais clientes ou ainda realizar a triagem de currículos para a contratação de colaboradores que estejam interessados nas vagas oferecidas pela HST.": "Con el consentimiento del usuario que accede a la información en el sitio web de HST y de acuerdo con nuestras políticas de privacidad, recopilamos datos personales mediante los formularios del sitio. Los datos solicitados por HST tienen como objetivo conocer nuevos socios comerciales, clientes potenciales y seleccionar currículos para la contratación de personas interesadas en las vacantes de HST.",
  "Para que um usuário possa fazer um download de uma apresentação resumida das soluções da HST, criamos formulários que coletam as informações pessoais dos usuários como: nome, e-mail, material acessado, idioma. Isto é feito para que possamos encaminhar outros informativos sobre soluções da HST e, eventualmente, criar relações comerciais.": "Para que un usuario pueda descargar una presentación resumida de las soluciones de HST, creamos formularios que recopilan información personal como nombre, correo electrónico, material consultado e idioma. Esto nos permite enviar información sobre las soluciones de HST y, eventualmente, establecer relaciones comerciales.",
  "Os dados coletados são armazenados por período indeterminado na plataforma registrada pela empresa The Rocket Science Group (“Mailchimp”), com sede nos Estados Unidos, e está de acordo com GDPR (General Data Protection Regulation) e demais legislações aplicáveis ao tratamento de dados pessoais.": "Los datos recopilados se almacenan por tiempo indeterminado en la plataforma de The Rocket Science Group (“Mailchimp”), con sede en Estados Unidos, conforme al GDPR (Reglamento General de Protección de Datos) y demás leyes aplicables al tratamiento de datos personales.",
  "O Mailchimp, conta com segurança online de criptografia TLS e offline com datas centers seguros 24 horas nos 7 dias da semana, e conta com biometria e acesso restrito apenas de funcionários autorizados conforme descrito na política de segurança publicada no site: ": "Mailchimp cuenta con seguridad en línea mediante cifrado TLS y centros de datos seguros las 24 horas, los 7 días de la semana, además de biometría y acceso restringido a personal autorizado, conforme a la política de seguridad publicada en: ",
  "Caso queira realizar remover o registro em nosso banco de dados, basta enviar um e-mail ao contato@hst.com.br ou selecionar a opção “unsubscribe” em um dos e-mails enviados. Todos os contatos realizados via e-mail marketing tem um campo na parte inferior do e-mail para que você possa realizar este pedido com facilidade.": "Si desea eliminar su registro de nuestra base de datos, envíe un correo electrónico a contato@hst.com.br o seleccione la opción “unsubscribe” en uno de los correos recibidos. Todos los mensajes de marketing por correo electrónico incluyen un campo al final para realizar esta solicitud fácilmente.",
  "Como controladores dos dados, restringimos o acesso apenas aos funcionários e parceiros de negócios que possam contactá-lo e possam propor ou comunicar informações adicionais sobre produtos e serviços de forma personalizada.": "Como responsables del tratamiento, restringimos el acceso únicamente a empleados y socios comerciales que puedan contactarlo y comunicar información adicional sobre productos y servicios de forma personalizada.",
  "O que fazemos com os dados coletados através da opção de envio de currículos e acesso a vagas de trabalho na HST?": "¿Qué hacemos con los datos recopilados mediante el envío de currículos y el acceso a vacantes en HST?",
  "Criamos formulários destinados para envio de currículos de pessoas que desejam participar do processo seletivo da HST. Antes de enviar qualquer dado ou documento a pessoa deve concordar com a política de privacidade do site. Os dados enviados nos permitem entrar em contato para oportunidades de empregos de acordo com a inscrição realizada.": "Creamos formularios para que las personas interesadas en el proceso de selección de HST envíen sus currículos. Antes de enviar cualquier dato o documento, la persona debe aceptar la política de privacidad del sitio. Los datos enviados nos permiten contactar al candidato sobre oportunidades de empleo según su inscripción.",
  "Os currículos são armazenados através da plataforma desenvolvida pela Saturday Drive INC (“Ninja Forms”) com sede nos Estados Unidos, que está de acordo com a GDPR (General Data Protection Regulation) e FTCA (Federal Trade Commission Act) e que atuam como processadores destes dados. Coletamos a vaga de interesse, nome, sobrenome, e-mail, telefone, url do LinkedIn e currículo.": "Los currículos se almacenan mediante la plataforma desarrollada por Saturday Drive INC (“Ninja Forms”), con sede en Estados Unidos, que cumple con el GDPR y la FTCA y actúa como procesador de estos datos. Recopilamos la vacante de interés, nombre, apellido, correo electrónico, teléfono, URL de LinkedIn y currículo.",
  "O Ninja Forms conta com tecnologia de criptografia SSL e revisam constantemente as informações online e físicas, com acesso restrito de informações apenas a funcionários e agentes treinados conforme descrito: ": "Ninja Forms utiliza tecnología de cifrado SSL y revisa constantemente la información en línea y física, con acceso restringido solo a empleados y agentes capacitados, como se describe en: ",
  "Como controladores dos dados, restringimos o acesso aos dados pessoais dos currículos apenas aos funcionários e parceiros de negócios que precisam de acesso para comunicar informações sobre o processo seletivo e possibilidades de vagas abertas específicas relacionadas a inscrição do usuário.": "Como responsables del tratamiento, restringimos el acceso a los datos personales de los currículos únicamente a empleados y socios comerciales que necesitan comunicar información sobre el proceso de selección y vacantes específicas relacionadas con la inscripción del usuario.",
  "Como a HST utiliza os Cookies?": "¿Cómo utiliza HST las cookies?",
  "Utilizamos cookies, que coletam informações de navegação do Browser sobre os usuários apenas como indicador, assim podemos melhorar continuamente a experiência da pessoa que está acessando o site e agilizar a busca das informações de forma mais rápida e eficiente. Não obtemos acessos a dados pessoais em cookies.": "Utilizamos cookies que recopilan información de navegación del navegador únicamente como indicador. Así podemos mejorar continuamente la experiencia de quien accede al sitio y agilizar la búsqueda de información. No obtenemos acceso a datos personales mediante cookies.",
  "Realizamos a coleta dos conjuntos de dados para reconhecer e analisar comportamentos de usabilidade, utilização de dispositivos (celular, tablet e computador) e realizar publicidades personalizadas.": "Recopilamos conjuntos de datos para reconocer y analizar comportamientos de usabilidad, uso de dispositivos (teléfono móvil, tableta y computadora) y realizar publicidad personalizada.",
  "Como funciona a visualização de conteúdo externo?": "¿Cómo funciona la visualización de contenido externo?", "Visualização de conteúdo de ferramentas externas": "Visualización de contenido de herramientas externas", "Gerenciamento de tags": "Gestión de etiquetas", "Linguagem de acesso": "Idioma de acceso",
  "Utilizamos em nosso site ferramentas do Youtube, desenvolvidas pelo Google, Inc (“Google”), em que as informações são tratadas nos Estados Unidos. A funcionalidade explorada através dessa ferramenta permite a visualização de vídeos em nosso site. Trata-se de um vídeo widget que possibilita transmitir vídeos publicados no Youtube neste site.": "Utilizamos en nuestro sitio herramientas de YouTube desarrolladas por Google, Inc. (“Google”), cuya información se trata en Estados Unidos. Esta herramienta permite visualizar en nuestro sitio videos publicados en YouTube.",
  "Você pode consultar os termos de privacidade e segurança de dados através de ": "Puede consultar los términos de privacidad y seguridad de datos en ",
  "Fazemos uso do Google Tag Manager, ferramenta de instalação de tags e scripts do Google, Inc. (“Google”), com sede e processamento de dados nos Estados Unidos. A ferramenta facilita a gestão centralizada das informações referentes ao comportamento dos usuários e permite análises personalizadas de dados em nosso site.": "Utilizamos Google Tag Manager, una herramienta de instalación de etiquetas y scripts de Google, Inc. (“Google”), con sede y procesamiento de datos en Estados Unidos. La herramienta facilita la gestión centralizada de la información sobre el comportamiento de los usuarios y permite análisis de datos personalizados en nuestro sitio.",
  "Consulte os termos de coleta, segurança e privacidade de dados através do link ": "Consulte los términos de recopilación, seguridad y privacidad de datos en el enlace ",
  "Utilizamos em nosso site o plugin WPML para tradução de conteúdo, desenvolvido pela OnTheGoSystems, com sede em Hong Kong com tratamento de acordo com a GDPR (General Data Protection) e segurança de SSL, HTTPS e limpeza frequente de dados pessoais no banco de informações.": "Utilizamos en nuestro sitio el complemento WPML para traducción de contenido, desarrollado por OnTheGoSystems, con sede en Hong Kong, con tratamiento de datos conforme al GDPR, seguridad SSL y HTTPS y limpieza frecuente de datos personales en la base de información.",
  "A ferramenta possibilita que no navegador do usuário seja gravado um cookie do idioma em que o site foi exibido durante a visita.": "La herramienta permite guardar en el navegador del usuario una cookie con el idioma en que se mostró el sitio durante la visita.",
  "Para maiores informações consulte a política de dados e privacidade através do link ": "Para más información, consulte la política de datos y privacidad en el enlace ",
  "Cookies de análise de comportamento da navegação": "Cookies de análisis del comportamiento de navegación",
  "Utilizamos em nosso site a ferramenta de análise web do Google, Inc., (“Google”) denominada como Google Analytics, para identificar apenas informações estatísticas em conjuntos de dados e relatórios, que não contém informações pessoais individuais.": "Utilizamos en nuestro sitio la herramienta de análisis web Google Analytics de Google, Inc. (“Google”) para identificar únicamente información estadística en conjuntos de datos e informes que no contienen información personal individual.",
  "Identificamos as origens que trouxeram usuários ao site, os dispositivos que realizaram acessos, se é uma visita de um novo usuário ou alguém que já acessou anteriormente. Assim como horários de acessos, páginas acessadas, comportamentos de visualizações, cliques, geolocalização e endereço de IP.": "Identificamos los orígenes que llevaron usuarios al sitio, los dispositivos utilizados, si se trata de una visita nueva o de un usuario recurrente, así como horarios, páginas visitadas, visualizaciones, clics, geolocalización y dirección IP.",
  "Através do seu navegador você pode instalar e ocultar as funcionalidades do Google Analytics em ": "A través de su navegador puede instalar y desactivar las funcionalidades de Google Analytics en ",
  "Cookies para publicidade são usados da seguinte forma:": "Las cookies para publicidad se utilizan de la siguiente manera:", "Google Analytics e Google Ads – Exibição de publicidade": "Google Analytics y Google Ads – Publicidad", "Facebook – Exibição de publicidade": "Facebook – Publicidad", "LinkedIn – Exibição de publicidade": "LinkedIn – Publicidad",
  "O Google, Inc., (“Google”), através de cookies próprios do Google Analytics e de terceiros, o Double Click, permite vinculação de publicidade personalizada em outros sites e plataformas, de acordo com o acesso que o usuário realizou em nosso site, essa prática bastante usual é conhecida como remarketing.": "Google, Inc. (“Google”), mediante cookies propios de Google Analytics y de terceros, como DoubleClick, permite vincular publicidad personalizada en otros sitios y plataformas según el acceso que el usuario realizó en nuestro sitio. Esta práctica habitual se conoce como remarketing.",
  "Esses cookies também podem coletar informações sobre comportamentos e interesses dos usuários de outros sites, para possibilitar anúncios nossos e de terceiros que também utilizam essas ferramentas. Para conhecer mais sobre como o Google pode utilizar suas informações acesse a política de privacidade em ": "Estas cookies también pueden recopilar información sobre comportamientos e intereses de usuarios de otros sitios para permitir anuncios nuestros y de terceros que utilizan estas herramientas. Para saber más sobre cómo Google puede utilizar su información, consulte la política de privacidad en ",
  "O Facebook, Inc (“Facebook”) possibilita através do uso de cookies a publicidade direcionada e personalizada de acordo com interesses e comportamentos dos usuários.": "Facebook, Inc. (“Facebook”) permite, mediante el uso de cookies, publicidad dirigida y personalizada de acuerdo con los intereses y comportamientos de los usuarios.",
  "Utilizamos a ferramenta do Facebook para fins de análise de acessos, conversões e publicidades de remarketing, com anúncios de acordo com o comportamento dos usuários dentro do nosso site.": "Utilizamos la herramienta de Facebook para analizar accesos, conversiones y publicidad de remarketing, con anuncios según el comportamiento de los usuarios en nuestro sitio.",
  "Para conhecer mais sobre como o Facebook pode utilizar seus dados através da utilização de sua plataforma, acesse a política de privacidade do Facebook em ": "Para saber más sobre cómo Facebook puede utilizar sus datos mediante su plataforma, consulte la política de privacidad de Facebook en ",
  "O LinkedIn Corporation (“LinkedIn”) possibilita através do uso de cookies a publicidade direcionada e personalizada de acordo com interesses e comportamentos dos usuários.": "LinkedIn Corporation (“LinkedIn”) permite, mediante el uso de cookies, publicidad dirigida y personalizada de acuerdo con los intereses y comportamientos de los usuarios.",
  "Utilizamos a ferramenta do LinkedIn para fins de análise de acessos, conversões e publicidades de remarketing, com anúncios de acordo com o comportamento dos usuários dentro do nosso site.": "Utilizamos la herramienta de LinkedIn para analizar accesos, conversiones y publicidad de remarketing, con anuncios según el comportamiento de los usuarios en nuestro sitio.",
  "Para conhecer mais sobre como o LinkedIn pode utilizar seus dados através da utilização de sua plataforma, acesse a política de privacidade do LinkedIn em ": "Para saber más sobre cómo LinkedIn puede utilizar sus datos mediante su plataforma, consulte la política de privacidad de LinkedIn en ",
  "Lei aplicável e resolução de conflitos": "Ley aplicable y resolución de conflictos", "Toda e qualquer controvérsia oriunda dos termos expostos na presente Política de Privacidade serão solucionados de acordo com a lei brasileira LGPD, sendo competente o foro da cidade de São Paulo, SP, Comarca da Capital, com exclusão de qualquer outro por mais privilegiado que seja.": "Toda controversia derivada de los términos expuestos en esta Política de Privacidad se resolverá de acuerdo con la legislación brasileña LGPD, siendo competente el fuero de la ciudad de São Paulo, SP, Comarca de la Capital, con exclusión de cualquier otro.",
  "Extensão dos efeitos": "Alcance de los efectos", "Os termos da Política de Privacidade aqui expostos serão aplicados exclusivamente às informações pessoais, conforme acima definido, que venham a ser disponibilizadas no site da HST.": "Los términos de esta Política de Privacidad se aplicarán exclusivamente a la información personal, según se define anteriormente, que se proporcione en el sitio web de HST.", "Por consequência, a Política de Privacidade aqui exposta não será aplicável a qualquer outro serviço disponibilizado pela HST.": "En consecuencia, esta Política de Privacidad no se aplicará a ningún otro servicio ofrecido por HST.",
  "Informações sobre seus direitos": "Información sobre sus derechos", "Os seguintes direitos estão disponíveis para você de acordo com a legislação de privacidade de dados brasileira": "Los siguientes derechos están disponibles para usted de acuerdo con la legislación brasileña de privacidad de datos", "Direito de informação sobre seus dados pessoais armazenados por nós;": "Derecho a recibir información sobre los datos personales que almacenamos;", "Direito de solicitar a correção, exclusão ou processamento restrito de seus dados pessoais;": "Derecho a solicitar la corrección, eliminación o tratamiento restringido de sus datos personales;", "Direito à portabilidade de dados;": "Derecho a la portabilidad de datos;", "Você pode, a qualquer momento, com efeito futuro, revogar seu consentimento para a coleta, processamento e uso de seus dados pessoais.": "Puede revocar en cualquier momento, con efecto futuro, su consentimiento para la recopilación, el tratamiento y el uso de sus datos personales.", "Se você deseja exercer seus direitos, envie sua solicitação ao contato ou ao escritório de proteção de dados da empresa indicado abaixo.": "Si desea ejercer sus derechos, envíe su solicitud al contacto o a la oficina de protección de datos de la empresa indicados a continuación.",
  "Para qualquer dúvida que possa ter em relação à privacidade dos dados pessoais, por favor, ou entre em contato diretamente com o Data Privacy Officer da empresa no seguinte endereço:": "Para cualquier duda relacionada con la privacidad de los datos personales, póngase en contacto directamente con el Data Privacy Officer de la empresa en la siguiente dirección:",
};

const reverseEnglishPairs = Object.fromEntries(Object.entries(englishPairs).map(([pt, en]) => [en, pt]));
const reverseSpanishPairs = Object.fromEntries(Object.entries(spanishPairs).map(([pt, es]) => [es, pt]));
let translating = false;

const languages: Record<Language, { label: string; flagSrc: string; name: string }> = {
  pt: { label: "PT", flagSrc: "/assets/flag-br.svg", name: "Português (Brasil)" },
  en: { label: "EN", flagSrc: "/assets/flag-us.svg", name: "English" },
  es: { label: "ES", flagSrc: "/assets/flag-es.svg", name: "Español" },
};

function toPortuguese(value: string, language: Language) {
  if (language === "pt") return value;
  return (language === "en" ? reverseEnglishPairs : reverseSpanishPairs)[value] ?? value;
}

function fromPortuguese(value: string, language: Language) {
  if (language === "pt") return value;
  const dictionary = language === "en" ? englishPairs : spanishPairs;
  const translated = dictionary[value];
  if (translated) return translated;

  // The privacy copy exists in both legacy HST and current Tolar branding.
  // Reuse the legal translations while retaining the current brand name.
  const hstVersion = dictionary[value.replaceAll("Tolar", "HST")];
  return hstVersion?.replaceAll("HST", "Tolar") ?? value;
}

function translateDocument(from: Language, to: Language) {
  if (translating) return;
  translating = true;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    if (node.parentElement?.closest(".locale")) return;
    const value = node.nodeValue ?? "";
    const trimmed = value.trim();
    if (!trimmed) return;
    const nextValue = value.replace(trimmed, fromPortuguese(toPortuguese(trimmed, from), to));
    if (nextValue !== value) node.nodeValue = nextValue;
  });
  document.querySelectorAll<HTMLInputElement>("input[placeholder]").forEach((input) => {
    const translated = fromPortuguese(toPortuguese(input.placeholder, from), to);
    if (translated) input.placeholder = translated;
  });
  document.documentElement.lang = to === "pt" ? "pt-BR" : to;
  translating = false;
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("pt");
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const previousLanguage = useRef<Language>("pt");

  useEffect(() => {
    const observer = new MutationObserver(() => translateDocument("pt", language));
    observer.observe(document.body, { childList: true, subtree: true });
    translateDocument(previousLanguage.current, language);
    previousLanguage.current = language;
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const setLang = (next: Language) => {
    setLanguage(next);
    setIsOpen(false);
  };

  const activeLanguage = languages[language];

  return (
    <div className="locale" ref={selectorRef}>
      <button
        type="button"
        className="locale-trigger"
        aria-label={`Idioma: ${activeLanguage.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <img className="locale-flag" src={activeLanguage.flagSrc} alt="" />
        <span>{activeLanguage.label}</span>
        <ChevronDown className={isOpen ? "is-open" : ""} size={14} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="locale-menu" role="menu" aria-label="Selecionar idioma">
          {(Object.keys(languages) as Language[]).map((code) => {
            const option = languages[code];
            return (
              <button key={code} type="button" className="locale-option" role="menuitemradio" aria-checked={language === code} onClick={() => setLang(code)}>
                <img className="locale-flag" src={option.flagSrc} alt="" />
                <span>{option.name}</span>
                {language === code && <Check size={14} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
