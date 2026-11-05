import { describe, expect, it } from 'vitest';
import AboutPage from '../../src/views/AboutPage.astro';
import CaseDetailPage from '../../src/views/CaseDetailPage.astro';
import ContactPage from '../../src/views/ContactPage.astro';
import ContactSentPage from '../../src/views/ContactSentPage.astro';
import CvPage from '../../src/views/CvPage.astro';
import ExperienceDetailPage from '../../src/views/ExperienceDetailPage.astro';
import ExperienceIndexPage from '../../src/views/ExperienceIndexPage.astro';
import HomePage from '../../src/views/HomePage.astro';
import ProfileDetailPage from '../../src/views/ProfileDetailPage.astro';
import ProfilesIndexPage from '../../src/views/ProfilesIndexPage.astro';
import ProjectDetailPage from '../../src/views/ProjectDetailPage.astro';
import ProjectsIndexPage from '../../src/views/ProjectsIndexPage.astro';
import NotFound from '../../src/pages/404.astro';
import { publishedCases, publishedExperiences, publishedProjects } from '../../src/lib/content';
import { profiles } from '../../src/data/profiles';
import { page } from '../helpers/render';

async function renderLangs(component: Parameters<typeof page>[0], extra: Record<string, string> = {}) {
  return Promise.all([
    page(component, { lang: 'es', ...extra }),
    page(component, { lang: 'en', ...extra }),
  ]);
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
  it('renders localized views', async () => {
    const homes = await renderLangs(HomePage);
    expect(byPath(homes, '/es/')).toContain('Jonatan Padilla, Senior Software Engineer');
    expect(byPath(homes, '/en/')).toContain('Available now');

    const cvs = await renderLangs(CvPage);
    expect(byPath(cvs, '/es/cv/')).not.toContain('id="cv-es"');
    expect(byPath(cvs, '/en/cv/')).not.toContain('id="cv-en"');

    const experienceIndex = await renderLangs(ExperienceIndexPage);
    expect(byPath(experienceIndex, '/es/experiencia/')).toContain('Siigo');
    expect(byPath(experienceIndex, '/en/experience/')).toContain('Siigo');

    const experiencePages = await Promise.all(
      (await publishedExperiences()).flatMap((entry) => [
        page(ExperienceDetailPage, { lang: 'es', empresa: entry.data.slug }),
        page(ExperienceDetailPage, { lang: 'en', empresa: entry.data.slug }),
      ]),
    );
    expect(experiencePages).toHaveLength(6);
    expect(byPath(experiencePages, '/es/experiencia/seek/')).toContain('InFinancexp');
    expect(byPath(experiencePages, '/en/experience/waco/')).toContain('Stages');

    const projectIndex = await renderLangs(ProjectsIndexPage);
    expect(byPath(projectIndex, '/es/proyectos/')).toContain('noindex, follow');
    expect(byPath(projectIndex, '/en/projects/')).toContain('noindex, follow');

    const projectPages = await Promise.all(
      (await publishedProjects()).flatMap((entry) => [
        page(ProjectDetailPage, { lang: 'es', proyecto: entry.id }),
        page(ProjectDetailPage, { lang: 'en', proyecto: entry.id }),
      ]),
    );
    const board = byPath(projectPages, '/es/proyectos/jtaskboard/');
    expect(board).toContain('class="prose"');

    const profileIndex = await renderLangs(ProfilesIndexPage);
    expect(byPath(profileIndex, '/en/profiles/')).toContain('Java backend');

    const profilePages = await Promise.all(
      profiles.flatMap((entry) => [
        page(ProfileDetailPage, { lang: 'es', slug: entry.slug }),
        page(ProfileDetailPage, { lang: 'en', slug: entry.slug }),
      ]),
    );
    expect(byPath(profilePages, '/es/perfiles/mobile-flutter/')).toContain('Desarrollo asistido por IA');
    expect(byPath(profilePages, '/en/profiles/backend-java/')).toContain('AI-assisted development');

    const contactPages = await renderLangs(ContactPage);
    expect(byPath(contactPages, '/es/contacto/')).toContain('data-netlify="true"');
    expect(byPath(contactPages, '/en/contact/')).toContain('name="bot-field"');

    const sentPages = await renderLangs(ContactSentPage);
    expect(byPath(sentPages, '/es/contacto/enviado/')).toContain('noindex, follow');
    expect(byPath(sentPages, '/en/contact/sent/')).toContain('noindex, follow');

    const aboutPages = await renderLangs(AboutPage);
    expect(byPath(aboutPages, '/es/sobre-mi/')).toContain('audífonos');
    expect(byPath(aboutPages, '/en/about/')).toContain('headphones');
  });

  it('renders the 404', async () => {
    const missing = await page(NotFound);
    expect(missing).toContain('Página no encontrada');
    expect(missing).toContain('Experiencia');
    expect(missing).toContain('noindex, follow');
  });

  it('rejects unknown slugs', async () => {
    await expect(page(ExperienceDetailPage, { lang: 'es', empresa: 'missing' })).rejects.toThrow('Missing experience: missing');
    await expect(page(ProfileDetailPage, { lang: 'es', slug: 'missing' })).rejects.toThrow('Unsupported profile');
    await expect(page(ProjectDetailPage, { lang: 'en', proyecto: 'missing' })).rejects.toThrow('Missing project: missing');
    await expect(page(CaseDetailPage, { lang: 'es', empresa: 'seek', proyecto: 'missing' })).rejects.toThrow(
      'Missing case: seek/missing',
    );
  });
});
