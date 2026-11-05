import { describe, expect, it } from 'vitest';
import * as aboutNs from '../../src/pages/[lang]/sobre-mi.astro';
import * as caseNs from '../../src/pages/[lang]/experiencia/[empresa]/casos/[proyecto].astro';
import * as contactNs from '../../src/pages/[lang]/contacto.astro';
import * as cvNs from '../../src/pages/[lang]/cv.astro';
import * as experienceNs from '../../src/pages/[lang]/experiencia/[empresa].astro';
import * as experiencesNs from '../../src/pages/[lang]/experiencia/index.astro';
import * as homeNs from '../../src/pages/[lang]/index.astro';
import * as profileNs from '../../src/pages/[lang]/perfiles/[slug].astro';
import * as profilesNs from '../../src/pages/[lang]/perfiles/index.astro';
import * as projectNs from '../../src/pages/[lang]/proyectos/[proyecto].astro';
import * as projectsNs from '../../src/pages/[lang]/proyectos/index.astro';
import * as sentNs from '../../src/pages/[lang]/contacto/enviado.astro';
import NotFound from '../../src/pages/404.astro';
import Root from '../../src/pages/index.astro';
import { publishedCases, publishedExperiences, publishedProjects } from '../../src/lib/content';
import { page } from '../helpers/render';

type Params = Record<string, string | undefined>;
type Routed = {
  default: Parameters<typeof page>[0];
  getStaticPaths: () => Promise<Array<{ params: Params }>> | Array<{ params: Params }>;
};

const home = homeNs as unknown as Routed;
const cv = cvNs as unknown as Routed;
const experiences = experiencesNs as unknown as Routed;
const experience = experienceNs as unknown as Routed;
const casePage = caseNs as unknown as Routed;
const projects = projectsNs as unknown as Routed;
const project = projectNs as unknown as Routed;
const profiles = profilesNs as unknown as Routed;
const profile = profileNs as unknown as Routed;
const contact = contactNs as unknown as Routed;
const sent = sentNs as unknown as Routed;
const about = aboutNs as unknown as Routed;

async function renderAll(mod: Routed) {
  const paths = await mod.getStaticPaths();
  const html: string[] = [];
  for (const entry of paths) {
    const result = await page(mod.default, entry.params);
    expect(result).toContain('<html');
    html.push(result);
  }
  return html;
}

function byPath(html: string[], path: string) {
  const match = html.find((item) => item.includes(`rel="canonical" href="https://jdpadillac.com${path}"`));
  expect(match, path).toBeTruthy();
  return match ?? '';
}

describe('published content', () => {
  it('lists the public experiences and projects', async () => {
    await expect(publishedExperiences().then((entries) => entries.map((entry) => entry.data.slug))).resolves.toEqual([
      'seek',
      'siigo',
      'waco',
    ]);
    await expect(publishedCases()).resolves.toEqual([]);
    const projects = await publishedProjects();
    expect(projects.map((entry) => entry.id)).toEqual([
      'jtaskboard',
      'wallet-provisioning',
      'qr-code-manager',
      'go-mysql-api',
      'go-chat',
      'pokemon-swiftui',
    ]);
  });
});

describe('static pages', () => {
  it('renders every localized route', async () => {
    const homes = await renderAll(home);
    expect(byPath(homes, '/es/')).toContain('/es/cv/#cv-es');
    expect(byPath(homes, '/es/')).toContain('Mobile / Flutter');
    expect(byPath(homes, '/es/')).toContain('SEEK');
    expect(byPath(homes, '/es/')).toContain('WACO Digital Hub');
    expect(byPath(homes, '/en/')).toContain('Available now');

    const cvs = await renderAll(cv);
    expect(byPath(cvs, '/es/cv/')).not.toContain('id="cv-es"');
    expect(byPath(cvs, '/en/cv/')).not.toContain('id="cv-en"');

    const experienceIndex = await renderAll(experiences);
    expect(byPath(experienceIndex, '/es/experiencia/')).toContain('Siigo');
    expect(byPath(experienceIndex, '/es/experiencia/')).not.toContain('/casos/');

    const experiencePages = await renderAll(experience);
    expect(experiencePages).toHaveLength(6);
    expect(byPath(experiencePages, '/es/experiencia/seek/')).toContain('InFinancexp');
    expect(byPath(experiencePages, '/en/experiencia/waco/')).toContain('Stages');
    expect(byPath(experiencePages, '/es/experiencia/siigo/')).toContain('¿Buscas un perfil como este?');

    expect(await casePage.getStaticPaths()).toEqual([]);

    const projectIndex = await renderAll(projects);
    expect(byPath(projectIndex, '/es/proyectos/')).toContain('Aplicación web');
    expect(byPath(projectIndex, '/en/proyectos/')).not.toContain('[Pendiente: traducción]');

    const projectPages = await renderAll(project);
    expect(projectPages).toHaveLength(12);
    const board = byPath(projectPages, '/es/proyectos/jtaskboard/');
    const boardEn = byPath(projectPages, '/en/proyectos/jtaskboard/');
    const pokemon = byPath(projectPages, '/en/proyectos/pokemon-swiftui/');
    expect(board).toContain('class="prose"');
    expect(board).toContain('https://jtaskboard-react-app.vercel.app');
    expect(board).toContain('jtaskboard-java-api');
    expect(boardEn).not.toContain('class="prose"');
    expect(boardEn).not.toContain('<p class="lead">');
    expect(pokemon).not.toContain('https://jtaskboard-react-app.vercel.app');

    const profileIndex = await renderAll(profiles);
    expect(byPath(profileIndex, '/en/perfiles/')).toContain('Java backend');

    const profilePages = await renderAll(profile);
    expect(byPath(profilePages, '/es/perfiles/mobile-flutter/')).toContain('Perfil Mobile / Flutter de Jonatan Padilla');
    expect(byPath(profilePages, '/en/perfiles/backend-java/')).toContain('Java backend profile of Jonatan Padilla');

    const contactPages = await renderAll(contact);
    expect(byPath(contactPages, '/es/contacto/')).toContain('data-netlify="true"');
    expect(byPath(contactPages, '/en/contacto/')).toContain('name="bot-field"');

    const sentPages = await renderAll(sent);
    expect(byPath(sentPages, '/es/contacto/enviado/')).toContain('noindex, follow');
    expect(byPath(sentPages, '/en/contacto/enviado/')).toContain('rel="alternate" hreflang="es"');

    const aboutPages = await renderAll(about);
    expect(byPath(aboutPages, '/es/sobre-mi/')).toContain('audífonos');
    expect(byPath(aboutPages, '/en/sobre-mi/')).toContain('headphones');
    expect(byPath(aboutPages, '/es/sobre-mi/')).toContain('Flutter');
  });

  it('renders the language gate and the 404', async () => {
    const root = await page(Root);
    expect(root).toContain('noindex, follow');
    expect(root).toContain('href="/es/"');
    expect(root).toContain('href="/en/" lang="en"');

    const missing = await page(NotFound);
    expect(missing).toContain('Página no encontrada');
    expect(missing).toContain('lang="en"');
    expect(missing).toContain('noindex, follow');
    expect(missing).not.toContain('rel="alternate"');
  });

  it('rejects unknown params', async () => {
    await expect(page(home.default, { lang: 'fr' })).rejects.toThrow('Unsupported language');
    await expect(page(cv.default, { lang: undefined })).rejects.toThrow('Unsupported language');
    await expect(page(experiences.default, { lang: 'pt' })).rejects.toThrow('Unsupported language');
    await expect(page(experience.default, { lang: 'fr', empresa: 'seek' })).rejects.toThrow('Unsupported experience');
    await expect(page(experience.default, { lang: 'es' })).rejects.toThrow('Unsupported experience');
    await expect(page(experience.default, { lang: 'es', empresa: 'missing' })).rejects.toThrow('Missing experience: missing');
    await expect(page(casePage.default, { lang: 'fr', empresa: 'seek', proyecto: 'caso' })).rejects.toThrow('Unsupported case');
    await expect(page(casePage.default, { lang: 'es', empresa: 'seek' })).rejects.toThrow('Unsupported case');
    await expect(page(casePage.default, { lang: 'es', proyecto: 'caso' })).rejects.toThrow('Unsupported case');
    await expect(page(casePage.default, { lang: 'es', empresa: 'missing', proyecto: 'caso' })).rejects.toThrow(
      'Missing case: missing/caso',
    );
    await expect(page(casePage.default, { lang: 'es', empresa: 'seek', proyecto: 'missing' })).rejects.toThrow(
      'Missing case: seek/missing',
    );
    await expect(page(projects.default, { lang: 'fr' })).rejects.toThrow('Unsupported language');
    await expect(page(project.default, { lang: 'fr', proyecto: 'jtaskboard' })).rejects.toThrow('Unsupported project');
    await expect(page(project.default, { lang: 'es' })).rejects.toThrow('Unsupported project');
    await expect(page(project.default, { lang: 'en', proyecto: 'missing' })).rejects.toThrow('Missing project: missing');
    await expect(page(profiles.default, { lang: 'fr' })).rejects.toThrow('Unsupported language');
    await expect(page(profile.default, { lang: 'fr', slug: 'mobile-flutter' })).rejects.toThrow('Unsupported profile');
    await expect(page(profile.default, { lang: 'es', slug: 'missing' })).rejects.toThrow('Unsupported profile');
    await expect(page(contact.default, { lang: 'fr' })).rejects.toThrow('Unsupported language');
    await expect(page(sent.default, { lang: 'fr' })).rejects.toThrow('Unsupported language');
    await expect(page(about.default, { lang: 'fr' })).rejects.toThrow('Unsupported language');
  });
});
