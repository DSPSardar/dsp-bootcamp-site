// src/app/learn-claude/content.ts — the course body, as authored HTML.
// English copy for the 30-day course; the same 30 lessons, in the same order,
// as the Urdu page (src/app/learn-claude-urdu/content.ts). Rendered inside the
// .lce wrapper by page.tsx and styled only by learn-claude.css. Edit the copy
// here, and keep the day ids (#day-1 … #day-30) matching the Urdu page.
export const COURSE_HTML = `
<div class="hero">
  <div class="wrap">
    <div class="hero-top">
      <div class="pill">30-day course</div>
      <div class="brand">DIGITAL SERVICES PROGRAM</div>
    </div>
    <h1>Learn Claude</h1>
    <div class="sub">One step a day</div>
    <div class="rule"></div>
    <p>The AI that does not just answer you. It does your work too.</p>
    <p class="for">This course is for people who cannot write code. Spend the first 14 days learning Claude, then the next 16 building with it: a website, a chatbot, an agent, and showing up in search. Plain English, one lesson a day, one small task a day.</p>
    <p class="alt"><a href="/learn-claude-urdu" hreflang="ur">Read this course in Urdu</a></p>
  </div>
</div>

<nav aria-label="Sections on this page">
  <div class="wrap">
    <ul>
      <li><a href="#map">The 30-day map</a></li>
      <li><a href="#three">Three parts</a></li>
      <li><a href="#models">Which model when</a></li>
      <li><a href="#chat">Chat</a></li>
      <li><a href="#cowork">Cowork</a></li>
      <li><a href="#code">Claude Code</a></li>
      <li><a href="#together">Which one when</a></li>
      <li><a href="#website">Website</a></li>
      <li><a href="#agents">Chatbots and agents</a></li>
      <li><a href="#search">Showing up in search</a></li>
      <li><a href="#care">Precautions</a></li>
    </ul>
  </div>
</nav>

<div class="lce-main">

<section id="map">
  <div class="wrap">
    <div class="kicker">Brochure</div>
    <h2>The 30-day map</h2>
    <p class="lead">One thing each day. Pick any day and its full lesson opens.</p>
    <ol class="map">
      <li><a href="#day-1"><span class="num">1</span><span><b>What Claude is</b><span class="d">From making an account to your first question</span></span></a></li>
      <li><a href="#day-2"><span class="num">2</span><span><b>Chat</b><span class="d">Ask so the answer is useful</span></span></a></li>
      <li><a href="#day-3"><span class="num">3</span><span><b>Context window</b><span class="d">Why Claude forgets things</span></span></a></li>
      <li><a href="#day-4"><span class="num">4</span><span><b>Projects</b><span class="d">Stop introducing yourself again and again</span></span></a></li>
      <li><a href="#day-5"><span class="num">5</span><span><b>Artifacts</b><span class="d">Finished reports, pages and tools</span></span></a></li>
      <li><a href="#day-6"><span class="num">6</span><span><b>Connectors</b><span class="d">Access to your email and files</span></span></a></li>
      <li><a href="#day-7"><span class="num">7</span><span><b>Skills</b><span class="d">Teach the method once</span></span></a></li>
      <li><a href="#day-8"><span class="num">8</span><span><b>Plugins</b><span class="d">A ready-made pack for a whole field</span></span></a></li>
      <li><a href="#day-9"><span class="num">9</span><span><b>Cowork</b><span class="d">Finished work, not just answers</span></span></a></li>
      <li><a href="#day-10"><span class="num">10</span><span><b>Schedule</b><span class="d">Work that runs itself, on time</span></span></a></li>
      <li><a href="#day-11"><span class="num">11</span><span><b>Dispatch</b><span class="d">Send work from your phone</span></span></a></li>
      <li><a href="#day-12"><span class="num">12</span><span><b>Claude Code</b><span class="d">Get a website or app built</span></span></a></li>
      <li><a href="#day-13"><span class="num">13</span><span><b>Which one when</b><span class="d">Chat, Cowork or Code</span></span></a></li>
      <li><a href="#day-14"><span class="num">14</span><span><b>A full day</b><span class="d">Everything together</span></span></a></li>
      <li><a href="#day-15"><span class="num">15</span><span><b>Planning the website</b><span class="d">Think before you build</span></span></a></li>
      <li><a href="#day-16"><span class="num">16</span><span><b>Frontend</b><span class="d">The part people see</span></span></a></li>
      <li><a href="#day-17"><span class="num">17</span><span><b>Backend and database</b><span class="d">The part that runs behind</span></span></a></li>
      <li><a href="#day-18"><span class="num">18</span><span><b>Forms and login</b><span class="d">So the visitor reaches you</span></span></a></li>
      <li><a href="#day-19"><span class="num">19</span><span><b>Going live</b><span class="d">Your site on the internet</span></span></a></li>
      <li><a href="#day-20"><span class="num">20</span><span><b>Domain and checks</b><span class="d">Your own address and a final look</span></span></a></li>
      <li><a href="#day-21"><span class="num">21</span><span><b>Chatbot</b><span class="d">An instant answer to every question</span></span></a></li>
      <li><a href="#day-22"><span class="num">22</span><span><b>AI agents</b><span class="d">Action, not talk</span></span></a></li>
      <li><a href="#day-23"><span class="num">23</span><span><b>Your first agent</b><span class="d">One that handles leads</span></span></a></li>
      <li><a href="#day-24"><span class="num">24</span><span><b>Multi-agent systems</b><span class="d">A team of agents</span></span></a></li>
      <li><a href="#day-25"><span class="num">25</span><span><b>A sales system</b><span class="d">From lead to deal</span></span></a></li>
      <li><a href="#day-26"><span class="num">26</span><span><b>SEO</b><span class="d">Showing up on Google</span></span></a></li>
      <li><a href="#day-27"><span class="num">27</span><span><b>On-page SEO</b><span class="d">Improve a page with Claude</span></span></a></li>
      <li><a href="#day-28"><span class="num">28</span><span><b>GEO</b><span class="d">Your name in AI answers</span></span></a></li>
      <li><a href="#day-29"><span class="num">29</span><span><b>Measuring results</b><span class="d">What is working and what is not</span></span></a></li>
      <li><a href="#day-30"><span class="num">30</span><span><b>The whole system</b><span class="d">One business, all connected</span></span></a></li>
    </ol>
  </div>
</section>

<section id="three">
  <div class="wrap">
    <div class="kicker">The big picture first</div>
    <h2>The three parts of Claude</h2>
    <p class="lead">There is one Claude, but three ways to put it to work. The whole course turns around these three.</p>
    <div class="grid3">
      <div class="card">
        <span class="tag">Claude Chat</span>
        <h3>Chat</h3>
        <p>You ask, Claude answers. Questions, advice, writing, understanding.</p>
        <p class="use">Come here when you want to think or ask.</p>
      </div>
      <div class="card">
        <span class="tag">Claude Cowork</span>
        <h3>Cowork</h3>
        <p>You hand over a job, Claude works through the steps itself and returns a finished result.</p>
        <p class="use">Come here when you want work done.</p>
      </div>
      <div class="card">
        <span class="tag">Claude Code</span>
        <h3>Claude Code</h3>
        <p>You say what to build, Claude writes the software and runs it.</p>
        <p class="use">Come here to build a website, an app or an agent.</p>
      </div>
    </div>
  </div>
</section>

<section id="models">
  <div class="wrap">
    <div class="kicker">Models</div>
    <h2>Which model when</h2>
    <p class="lead">The model is Claude's brain. Claude has several models: some fast and light, some slower but deeper. In the app there is a model menu next to the box where you type, and you switch from there.</p>
    <div class="grid3">
      <div class="card">
        <span class="tag">Haiku</span>
        <h3>Haiku</h3>
        <p>The fastest and lightest.</p>
        <p class="use">Small, quick jobs: a short answer, a translation, fixing a message, a simple summary.</p>
      </div>
      <div class="card">
        <span class="tag">Sonnet</span>
        <h3>Sonnet</h3>
        <p>A balance of speed and understanding.</p>
        <p class="use">Most everyday work: writing, analysis, planning, a normal report.</p>
      </div>
      <div class="card">
        <span class="tag">Opus</span>
        <h3>Opus</h3>
        <p>For deep thinking and long work.</p>
        <p class="use">A hard problem, a job with many steps, big research, big software.</p>
      </div>
      <div class="card">
        <span class="tag">Fable</span>
        <h3>Fable</h3>
        <p>The most intelligent model.</p>
        <p class="use">The hardest thinking, and long work that Claude keeps running on its own for a while.</p>
      </div>
    </div>
    <div class="note">
      <p><b>The simple rule:</b> start with Sonnet. If the job is very simple, use Haiku. If the answer feels shallow or the job is hard, use Opus, and if you need to go further still, Fable.</p>
      <p><b>Two things to remember:</b> a bigger model uses up your usage limit faster, so do not pick the biggest model for every job. And which models you get depends on your plan. Model numbers keep changing, but these four levels and the rule behind them stay the same.</p>
    </div>
  </div>
</section>

<section id="chat">
  <div class="wrap">
    <div class="kicker">Part one, days 1 to 8</div>
    <h2>Claude Chat</h2>
    <div class="part">

      <article class="lesson" id="day-1">
        <div class="lesson-head"><span class="num">1</span><h3>What Claude is and how to start</h3></div>
        <p>Claude is an AI assistant. You talk to it the way you would talk to a sensible colleague, and it writes for you, advises you and gets work off your plate.</p>
        <p>Starting is not hard. Install the Claude app on your phone or open the website on your computer, make an account and type your first question. There is no special language to learn. Write what is on your mind. Write in Urdu and the answer comes back in Urdu.</p>
        <div class="task"><b>Today's task:</b> Tell Claude about your business in two lines, then ask which three things you should do this week.</div>
      </article>

      <article class="lesson" id="day-2">
        <div class="lesson-head"><span class="num">2</span><h3>Chat: how to ask</h3><span class="tag">Chat</span></div>
        <p>The answer is only as good as your question. Most people type one line and leave it, then say the answer was generic.</p>
        <p>Three things make the difference. First, say who you are and who the work is for. Second, say clearly what you need. Third, say what shape the answer should take: short, a list, or a full piece of writing.</p>
        <p>The first answer is not the last. If you do not like it, say make it shorter, or write it in simpler words. A conversation with Claude keeps going.</p>
        <div class="task"><b>Today's task:</b> Have Claude write a message you would send to a customer. Ask in one line first, then ask again with all three things included. Compare the two answers.</div>
      </article>

      <article class="lesson" id="day-3">
        <div class="lesson-head"><span class="num">3</span><h3>The context window</h3></div>
        <p>Has Claude ever forgotten, late in a long conversation, something you told it at the start? The reason is the context window.</p>
        <p>Think of it as Claude's desk. Everything in one conversation sits on that desk: your messages, its answers, your files. The desk is big, but it has a limit. When it fills up, the older things start to fade.</p>
        <p>The fix is easy. New topic, new chat. Do not put ten different jobs into one chat. When a conversation gets long, ask Claude to summarise it so far and carry that summary into a new chat.</p>
        <div class="task"><b>Today's task:</b> In one of your long chats, ask Claude for a summary and start a new chat from it.</div>
      </article>

      <article class="lesson" id="day-4">
        <div class="lesson-head"><span class="num">4</span><h3>Projects</h3></div>
        <p>Writing out your business introduction in every new chat is tiring. Projects solve exactly that.</p>
        <p>A project is a separate room made for one piece of work. You put your files in it and write instructions once on how Claude should handle that work. After that, every chat in the project already knows all of it.</p>
        <p>For example, make a project for your shop's marketing. Put in the price list, your brand's style and some old posts. Now every new post is written in that same style.</p>
        <div class="task"><b>Today's task:</b> Make a project for the job you repeat most, add two files and write four lines of instructions.</div>
      </article>

      <article class="lesson" id="day-5">
        <div class="lesson-head"><span class="num">5</span><h3>Artifacts</h3></div>
        <p>You read a chat answer and move on. But some things are worth keeping: a report, a presentation, a web page, or a small calculator tool. Claude builds such a thing separately, and that is called an artifact.</p>
        <p>An artifact opens in its own panel next to the chat. You can look at it, ask Claude to change it, and send it to others with a link. This course itself began as an artifact.</p>
        <div class="task"><b>Today's task:</b> Ask Claude to make a one-page introduction page for your business. Once it is made, ask for one change, such as a colour or the headline.</div>
      </article>

      <article class="lesson" id="day-6">
        <div class="lesson-head"><span class="num">6</span><h3>Connectors</h3></div>
        <p>Until now Claude knew only what you typed into the chat. Connectors take it to your real work.</p>
        <p>A connector is a bridge that joins Claude to one of your apps, such as email, file storage or your calendar. Once it is connected you can say show me today's important emails, or find that file and summarise it, and Claude goes and looks for itself.</p>
        <p>Control stays in your hands. You connect it yourself, you grant the permission yourself, and you can remove it whenever you like. Connect only the apps you actually need.</p>
        <div class="task"><b>Today's task:</b> Connect your email or calendar and ask which meetings you have this week and which emails are still waiting for a reply.</div>
      </article>

      <article class="lesson" id="day-7">
        <div class="lesson-head"><span class="num">7</span><h3>Skills</h3></div>
        <p>Teach a new employee how a job is done once and they do it that way every time. Skills do the same for Claude.</p>
        <p>A skill is a set of instructions written for one particular job. For example, how your weekly report is made, which sections it has, what the style is. Write all of that into a skill once. From then on, whenever you ask for the report, Claude picks up that method on its own.</p>
        <p>Remember the difference between a project and a skill. A project is a place for one piece of work. A skill is a method that travels with you everywhere.</p>
        <div class="task"><b>Today's task:</b> Think of a job you do the same way every week. Tell Claude its steps and ask it to turn them into a skill.</div>
      </article>

      <article class="lesson" id="day-8">
        <div class="lesson-head"><span class="num">8</span><h3>Plugins</h3></div>
        <p>Yesterday we talked about a single skill. Now imagine getting the work of a whole field in one go. That is a plugin.</p>
        <p>A plugin is a ready-made pack that brings together several skills and the connectors they need for one role. Install a sales plugin and Claude knows customer research, call preparation and writing follow-ups. Install a marketing one and it knows campaign planning and writing content.</p>
        <p>The benefit is that you do not have to build everything yourself. Install it once and Claude becomes an experienced colleague in that field.</p>
        <div class="task"><b>Today's task:</b> Find a plugin close to your own work, install it and try one of its jobs.</div>
      </article>

      <article class="lesson">
        <div class="lesson-head"><h3>What else is in chat</h3></div>
        <ul class="plain">
          <li>Files and images: drop a document, a spreadsheet or a picture into the chat and ask about it.</li>
          <li>Web search: for current information Claude searches the internet and answers with its sources.</li>
          <li>Voice: speak instead of typing.</li>
          <li>Memory: Claude can remember the important things you tell it for your next chat. You turn this on and off in your settings.</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section id="cowork">
  <div class="wrap">
    <div class="kicker">Part two, days 9 to 11</div>
    <h2>Claude Cowork</h2>
    <div class="part">

      <article class="lesson" id="day-9">
        <div class="lesson-head"><span class="num">9</span><h3>Cowork: finished work, not answers</h3></div>
        <p>In chat you ask a question and get an answer. In Cowork you hand over a job and get a finished result.</p>
        <p>Here is the difference. In chat, Claude tells you how the report would be made. In Cowork it opens the files itself, does the research, runs the numbers and puts the finished report in front of you. Even when the job has many steps it keeps going on its own, and you can watch which step is done as it works.</p>
        <p>This is where everything from the earlier days pays off. Connectors give it your data, skills give it the method, and the result arrives as an artifact or a file.</p>
        <div class="task"><b>Today's task:</b> Give it a job with several steps. For example, have it research three of your competitors and build a one-page comparison.</div>
      </article>

      <article class="lesson">
        <div class="lesson-head"><h3>Before you start with Cowork</h3></div>
        <ul class="plain">
          <li>To have work done on the files on your computer, you need the Claude app on your computer.</li>
          <li>Claude works only in the folder you allow. Do not open up the whole computer. Give one folder for one job.</li>
          <li>Describe the job clearly: what you want, what to build it from, and what shape the result should take.</li>
          <li>Give a small job first, look at the result, then hand over a bigger one.</li>
        </ul>
      </article>

      <article class="lesson" id="day-10">
        <div class="lesson-head"><span class="num">10</span><h3>Schedule</h3></div>
        <p>Some jobs happen at the same time every day. Checking the morning's email, the weekly report, the monthly accounts. You do not need to ask each time.</p>
        <p>With a schedule you tell Claude once which job to do and when. For example, every morning at eight, go through my email and summarise what matters. After that the job runs by itself at the set time and the result comes to you.</p>
        <p>The job starts fresh every time, so write the instruction in full. What to look at, where, and what shape you want the result in.</p>
        <div class="task"><b>Today's task:</b> Pick one daily or weekly job and schedule it. Look at the first result and improve the instruction.</div>
      </article>

      <article class="lesson" id="day-11">
        <div class="lesson-head"><span class="num">11</span><h3>Dispatch</h3></div>
        <p>You are out of the office and remember a file you were supposed to prepare, and it is sitting on your computer. That is the moment for Dispatch.</p>
        <p>With Dispatch you write the job to Claude from your phone, and Claude does it on your computer, with the files and connected apps that live there. The same conversation runs on your phone and your computer, so when you get back everything is right there. You do not watch every step. You hand over the job, get on with your own work, and look at the result later.</p>
        <p>It needs a paid plan and the Claude app on your computer. The computer has to stay on with the app open. Because Claude is working while you are away, give it access only to the folders it needs.</p>
        <div class="task"><b>Today's task:</b> Link your phone and your computer, then go out and send one small job from your phone.</div>
      </article>
    </div>
  </div>
</section>

<section id="code">
  <div class="wrap">
    <div class="kicker">Part three, day 12</div>
    <h2>Claude Code</h2>
    <div class="part">

      <article class="lesson" id="day-12">
        <div class="lesson-head"><span class="num">12</span><h3>What Claude Code is</h3></div>
        <p>Claude Code is a tool for building software. It reads the files of a whole project, works out which file does what, then on your word writes a new part, finds and fixes a fault, runs the thing to test it and saves the changes.</p>
        <p>You say what you want in ordinary language and it does the rest. That means building a website, an app or an AI agent no longer takes years of programming. What it takes is knowing what you want to build and how to give Claude a clear instruction.</p>
        <p>It runs in four places: the computer's terminal, the web, the desktop app and mobile. If you cannot code, starting from the app or the web is easier.</p>
      </article>

      <article class="lesson">
        <div class="lesson-head"><h3>If you cannot code, work like this</h3></div>
        <ol class="steps">
          <li>Say what to build, who it is for, and what it must include. The clearer you are, the better it turns out.</li>
          <li>Ask for a plan before the build. Say: first tell me in plain words what you are going to do.</li>
          <li>Have one small part built at a time, then run it and look for yourself.</li>
          <li>Ask about anything you do not understand. Claude explains the code it wrote in plain words.</li>
          <li>If something breaks, copy the error you see and hand it over. It will find the cause and fix it.</li>
          <li>Have the work saved after every successful step, so you can go back if you need to.</li>
        </ol>
        <div class="task"><b>Today's task:</b> Have Claude Code build a one-page web page for your business with your name, services and contact number. Then ask for one change.</div>
      </article>
    </div>
  </div>
</section>

<section id="together">
  <div class="wrap">
    <div class="kicker">Part four, days 13 and 14</div>
    <h2>Which one when</h2>
    <div class="part">

      <article class="lesson" id="day-13">
        <div class="lesson-head"><span class="num">13</span><h3>Chat, Cowork or Code: which one when</h3></div>
        <p>Ask yourself one question. Do I want an answer, finished work, or working software? The reply tells you where to go.</p>
        <div class="tablebox">
          <table>
            <thead><tr><th scope="col">What you need</th><th scope="col">Where to go</th><th scope="col">Example</th></tr></thead>
            <tbody>
              <tr><td>An answer or advice</td><td>Chat</td><td>Writing a message, talking through an idea, understanding something</td></tr>
              <tr><td>Finished work</td><td>Cowork</td><td>Research, a report, analysing files, sorting email</td></tr>
              <tr><td>Working software</td><td>Claude Code</td><td>A website, an app, an agent, repairing existing code</td></tr>
            </tbody>
          </table>
        </div>
        <div class="task"><b>Today's task:</b> Write down five of your jobs for this week and mark each one as chat, Cowork or Code.</div>
      </article>

      <article class="lesson" id="day-14">
        <div class="lesson-head"><span class="num">14</span><h3>A full day with Claude</h3></div>
        <p>At eight in the morning the schedule runs by itself, and through your connectors a summary of your email and calendar is waiting for you.</p>
        <p>At the office you go into your project, where Claude already knows your business. A customer needs a proposal, so you give the job to Cowork, and it follows the method in your skill and produces the finished document.</p>
        <p>In the afternoon you are out, so you send the next job from your phone with Dispatch. In the evening a question comes to mind, and chat is there.</p>
        <p>None of this is far off. All of it is possible today. At this point you have learned Claude. In the next sixteen days you will use it to build things for your business.</p>
      </article>
    </div>
  </div>
</section>

<section id="website">
  <div class="wrap">
    <div class="kicker">Part five, days 15 to 20</div>
    <h2>Build a website with Claude</h2>
    <p class="lead">From here the learning ends and the building starts. Each lesson ahead is one idea and one small task, so the whole map makes sense to you.</p>
    <div class="part">

      <article class="lesson" id="day-15">
        <div class="lesson-head"><span class="num">15</span><h3>Planning the website</h3><span class="tag">Plan</span></div>
        <p>Most websites turn out weak because the person building them sits straight down to build. Three questions need answers first. Who is this site for? Which pages will it have? And what should the visitor do at the end: call, fill in a form, or buy?</p>
        <p>Do this in chat with Claude. Tell it to plan your website by asking you questions one after another. The plan that comes out is what you hand to Claude Code in the coming days.</p>
        <div class="task"><b>Today's task:</b> Have Claude plan your website: a list of pages and a one-line purpose for each.</div>
      </article>

      <article class="lesson" id="day-16">
        <div class="lesson-head"><span class="num">16</span><h3>Frontend</h3></div>
        <p>The frontend is the part of a website people see and touch. Pages, colours, pictures, buttons, text. Think of it as the front of a shop, where the customer walks in.</p>
        <p>Give Claude Code yesterday's plan and tell it to build the first page. When it is built, look at it on both a computer and a phone, because most people arrive on a phone. Whatever you do not like, say in ordinary words: make the headline bigger, move the button up.</p>
        <div class="task"><b>Today's task:</b> Have the first page of your site built, open it on your phone and ask for three changes.</div>
      </article>

      <article class="lesson" id="day-17">
        <div class="lesson-head"><span class="num">17</span><h3>Backend and database</h3></div>
        <p>The backend is the part nobody sees but which does all the work. In the shop picture, it is the storeroom and the accounts ledger. When someone fills in a form or places an order, the backend receives it and stores it.</p>
        <p>The database is the organised ledger where all of it is written down: customers, orders, messages. You do not write this yourself. Claude Code does. Your job is to decide what the site has to remember.</p>
        <div class="task"><b>Today's task:</b> List the information your site needs to store, for example the customer's name, number and what they need.</div>
      </article>

      <article class="lesson" id="day-18">
        <div class="lesson-head"><span class="num">18</span><h3>Forms and login</h3></div>
        <p>The contact form is the most valuable part of a website, because that is where a visitor becomes a customer. Keep the form short. Name, number and one question is enough. The more boxes there are, the fewer people fill it in.</p>
        <p>Not every site needs a login. You need one when each person has their own area, such as the students of a course or members. Remember one thing: do not have a password system built from scratch. Tell Claude to use a proven service for it.</p>
        <div class="task"><b>Today's task:</b> Have a contact form built, fill it in yourself and check whether the details reached you.</div>
      </article>

      <article class="lesson" id="day-19">
        <div class="lesson-head"><span class="num">19</span><h3>Taking the site live</h3><span class="tag">Deploy</span></div>
        <p>So far your site exists only on your computer. To show it to the world it needs a place on the internet, and that is called hosting. Ask Claude Code to help you take your site live step by step. It will tell you where to make an account and what to do next.</p>
        <p>One precaution matters a great deal. The services your site connects to have secret keys. These are never written openly in the code. Tell Claude plainly to keep the keys in a safe place.</p>
        <div class="task"><b>Today's task:</b> Take the site live, send the link to a friend and ask whether it opened.</div>
      </article>

      <article class="lesson" id="day-20">
        <div class="lesson-head"><span class="num">20</span><h3>Domain and final checks</h3></div>
        <p>The domain is your site's address, the name people type to reach you. Choose a short name that is easy to remember, buy it, and ask Claude how to connect it to the site.</p>
        <p>Then, before you tell people, go through the whole site yourself once:</p>
        <ul class="plain">
          <li>Does every page look right on a phone?</li>
          <li>Does every button and every link go to the right place?</li>
          <li>Does the message arrive when the form is filled in?</li>
          <li>Does the page open quickly?</li>
          <li>Are the name, number and prices written correctly?</li>
        </ul>
        <div class="task"><b>Today's task:</b> Do these five checks yourself, then ask Claude to look at the site and point out the weak spots too.</div>
      </article>
    </div>
  </div>
</section>

<section id="agents">
  <div class="wrap">
    <div class="kicker">Part six, days 21 to 25</div>
    <h2>Chatbots and agents</h2>
    <div class="part">

      <article class="lesson" id="day-21">
        <div class="lesson-head"><span class="num">21</span><h3>A chatbot on your website</h3></div>
        <p>At two in the morning someone lands on your site and wants to ask the price. Nobody is there to answer, so they leave. A chatbot fixes that, answering every question at any hour, straight away.</p>
        <p>A bot is only as good as the information you give it. Give it what it needs to know about your business: services, prices, hours, common questions. And teach it not to guess when it does not know something, but to say I will pass this on to our team.</p>
        <div class="task"><b>Today's task:</b> Write down the twenty questions customers ask you again and again, with their answers. That is your bot's knowledge.</div>
      </article>

      <article class="lesson" id="day-22">
        <div class="lesson-head"><span class="num">22</span><h3>What an AI agent is</h3></div>
        <p>A chatbot talks. An agent acts. That is the whole difference.</p>
        <p>A bot tells you tomorrow at four in the afternoon is free. An agent books that slot, writes it in the calendar and sends the customer a confirmation.</p>
        <p>An agent is made of three things. The model, which is its brain. The instructions, which say what it should and should not do. And the tools, meaning the apps it can reach, such as a calendar, email or a database. The connectors from day 6 and the skills from day 7 are exactly these tools and instructions.</p>
        <div class="task"><b>Today's task:</b> Write down three jobs in your business that are done the same way every time and that an agent could do.</div>
      </article>

      <article class="lesson" id="day-23">
        <div class="lesson-head"><span class="num">23</span><h3>Your first agent</h3></div>
        <p>Keep your first agent small. One job, clear limits. A good start is a lead-handling agent: when a new enquiry comes in, it asks two or three necessary questions, stores the answers and notifies you.</p>
        <p>Make sure the instructions cover three things. What it should do. What it should not do, for example promising a discount. And when to hand the matter to a human.</p>
        <p>Before you switch it on, play the customer yourself and ask hard questions. Wherever it answers wrongly, improve the instructions.</p>
        <div class="task"><b>Today's task:</b> Write your lead agent's instructions: what it asks, what it must not say, and when it calls you in.</div>
      </article>

      <article class="lesson" id="day-24">
        <div class="lesson-head"><span class="num">24</span><h3>Multi-agent systems</h3></div>
        <p>Ask one employee to do the research, the writing, the checking and the accounts, and quality drops. An agent is no different. When the job is big, you build a team of agents.</p>
        <p>For example, one agent researches, a second writes, a third checks. Above them sits a supervisor agent that divides the work and joins the results.</p>
        <p>But not every job needs a team. A team adds both cost and complexity. The rule is to start with one agent, and build a team only when the parts of the job really call for different expertise.</p>
        <div class="task"><b>Today's task:</b> Split one of your big jobs into three roles and write who does what and who they pass it to.</div>
      </article>

      <article class="lesson" id="day-25">
        <div class="lesson-head"><span class="num">25</span><h3>A complete sales system with AI</h3><span class="tag">AI Sales Operating System</span></div>
        <p>In most businesses a customer is lost because the reply came late or nobody followed up at all. A sales system stops that.</p>
        <p>This is the path. A lead comes in. It gets an instant reply. It is asked what it needs. A meeting or call is booked. If no reply comes, a follow-up goes out. And everything is written to the record.</p>
        <p>An agent can work at each step, and together they form one system. Closing the deal is still a human's job. The agents make sure no customer drops out along the way.</p>
        <div class="task"><b>Today's task:</b> Write down the steps of your sales process and mark the step where you lose the most customers. Your first agent goes there.</div>
      </article>
    </div>
  </div>
</section>

<section id="search">
  <div class="wrap">
    <div class="kicker">Part seven, days 26 to 30</div>
    <h2>Showing up in search</h2>
    <div class="part">

      <article class="lesson" id="day-26">
        <div class="lesson-head"><span class="num">26</span><h3>The basics of SEO</h3><span class="tag">SEO</span></div>
        <p>The website is built, but how will anyone arrive? SEO is the work that moves your site up in Google's results.</p>
        <p>The basics are three things. First, know what your customer types into Google. Second, your page should give the best and clearest answer to that question. Third, the site should be fast and work properly on a phone.</p>
        <p>This takes time. Results come in weeks and months, not days. Be wary of anyone who promises instant results.</p>
        <div class="task"><b>Today's task:</b> Write down ten questions your customer probably types into Google. Ask Claude to add more to the list.</div>
      </article>

      <article class="lesson" id="day-27">
        <div class="lesson-head"><span class="num">27</span><h3>On-page SEO with Claude</h3></div>
        <p>The rule is simple: one page, one question. Take one question from yesterday's list and make a page for it that answers it completely.</p>
        <p>Look at four things on every page. The title, which shows in search. The short description, which appears under the title. The headings, which divide the page into parts. And the links to other pages on your own site. Show Claude the page and tell it to check and improve all four.</p>
        <p>One thing Claude cannot give you: your own experience. Add your own customers' examples, your own pictures, your own results. That is what sets your page apart from everyone else's.</p>
        <div class="task"><b>Today's task:</b> Pick one question, have its page made, and add one real example from your own work.</div>
      </article>

      <article class="lesson" id="day-28">
        <div class="lesson-head"><span class="num">28</span><h3>GEO: your name in AI answers</h3></div>
        <p>Many people now ask an AI, instead of Google, who is best for a given job. GEO is the work that gets your name into the AI's answer.</p>
        <p>What helps: write clear, direct facts on your pages, who you are, what you do, where you are. Write in question-and-answer form. Get mentioned in other trustworthy places. And keep your name, address and number identical everywhere.</p>
        <p>There are no guarantees here. Whose name an AI gives is in nobody's control. All you can do is put information about yourself out so clearly, and in so many places, that finding you is easy for it.</p>
        <div class="task"><b>Today's task:</b> Ask Claude and one other AI a question about your field and your city. See whose name comes up, and whether yours does.</div>
      </article>

      <article class="lesson" id="day-29">
        <div class="lesson-head"><span class="num">29</span><h3>Measuring results</h3></div>
        <p>What is not measured does not improve. Once a week, look at three things. How many people came to the site. Where they came from. And how many of them got in touch. The last number matters most.</p>
        <p>For AI answers, ask the same five questions again every week and note whether your name came up. After a few weeks you will see a trend.</p>
        <p>This job is a perfect fit for the schedule from day 10. Set it once and the report arrives by itself every week.</p>
        <div class="task"><b>Today's task:</b> Make a short weekly checklist and schedule it in Claude.</div>
      </article>

      <article class="lesson" id="day-30">
        <div class="lesson-head"><span class="num">30</span><h3>The whole system, together</h3></div>
        <p>Thirty days ago you asked Claude your first question. Today, look at how everything connects.</p>
        <p>SEO and GEO bring people to your website. The website tells them who you are. The chatbot answers their question straight away. The agent takes their details and books the meeting. The sales system follows up. And Claude handles your own work every day.</p>
        <p>This is a business that works even while you sleep, and you did not need to be a programmer to build it. What you needed was to know what to build, and how to tell Claude.</p>
        <div class="note">
          <p><b>The road ahead:</b> This course showed you the whole map. If you want to learn to build each piece yourself, step by step with practical examples, the full program is below.</p>
        </div>
      </article>
    </div>
  </div>
</section>

<section id="care">
  <div class="wrap">
    <div class="kicker">Important</div>
    <h2>Four precautions</h2>
    <ul class="plain">
      <li>Never type a password, a bank account number or a national ID card number into a chat.</li>
      <li>Check important facts, calculations and anything legal or medical yourself. Claude can make mistakes.</li>
      <li>Grant permissions with thought. Connect only the app and the folder the job needs.</li>
      <li>Anything that goes out in your name, an email, a post or a payment, read it yourself before it is sent.</li>
    </ul>
  </div>
</section>

<section class="cta" id="start">
  <div class="wrap">
    <div class="kicker">Learn Claude, one step a day</div>
    <h2>Start today</h2>
    <p class="lead">These 30 days show you the whole road. If you want to build the website, the agents and the sales system yourself, step by step with practical examples, the full program is here.</p>
    <div class="linkbox">
      <span class="lab">The full course</span>
      <a href="/mastery">digitalservicesprogram.com/mastery</a>
    </div>
    <div class="wa"><span>WhatsApp</span><span class="num-wa">+92 311 8122222</span></div>
  </div>
</section>

</div>
`
