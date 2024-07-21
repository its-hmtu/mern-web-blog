import React from 'react';
import 'styles/index.scss';

const CodeOfConduct = () => {
  return (
    <div className="code-of-conduct container">
      <div className="header">
        <h1>Code of Conduct</h1>
        <p>
          <em>Last updated July 31, 2023</em>
        </p>
        <p>
          All participants of DEV Community are expected to abide by our Code of
          Conduct and
          <a href="#"> Terms of Service</a>, both online and during in-person
          events that are hosted and/or associated with DEV Community.
        </p>
      </div>

      <div className="section">
        <h2>Our Pledge</h2>
        <p>
          In the interest of fostering an open and welcoming environment, we as
          moderators of
          <a href="#"> DEV Community</a> pledge to make participation in our
          project and our community a harassment-free experience for everyone,
          regardless of age, body size, disability, ethnicity, gender identity
          and expression, level of experience, nationality, personal appearance,
          race, religion, or sexual identity and orientation.
        </p>
      </div>

      <div className="section">
        <h2>Our Standards</h2>
        <p>
          Examples of behavior that contributes to creating a positive
          environment include:
        </p>
        <ul>
          <li>Using welcoming and inclusive language</li>
          <li>Being respectful of differing viewpoints and experiences</li>
          <li>
            Referring to people by their pronouns and using gender-neutral
            pronouns when uncertain
          </li>
          <li>Gracefully accepting constructive criticism</li>
          <li>Focusing on what is best for the community</li>
          <li>Showing empathy towards other community members</li>
          <li>
            Citing sources if used to create content (for guidance see
            <a href="#"> DEV Community: How to Avoid Plagiarism</a>)
          </li>
          <li>
            Following our <a href="#">AI Guidelines</a> and disclosing AI
            assistance if used to create content
          </li>
        </ul>

        <p>Examples of unacceptable behavior by participants include:</p>
        <ul>
          <li>
            The use of sexualized language or imagery and unwelcome sexual
            attention or advances
          </li>
          <li>
            The use of hate speech or communication that is racist, homophobic,
            transphobic, ableist, sexist, or otherwise prejudiced/discriminatory
            (i.e. misusing or disrespecting pronouns)
          </li>
          <li>
            Trolling, insulting/derogatory comments, and personal or political
            attacks
          </li>
          <li>Public or private harassment</li>
          <li>
            Publishing others' private information, such as a physical or
            electronic address, without explicit permission
          </li>
          <li>Plagiarizing content or misappropriating works</li>
          <li>
            Other conduct which could reasonably be considered inappropriate in
            a professional setting
          </li>
          <li>Dismissing or attacking inclusion-oriented requests</li>
        </ul>

        <p>
          We pledge to prioritize marginalized people's safety over privileged
          people's comfort. We will not act on complaints regarding:
        </p>
        <ul>
          <li>
            'Reverse' -isms, including 'reverse racism,' 'reverse sexism,' and
            'cisphobia'
          </li>
          <li>
            Reasonable communication of boundaries, such as 'leave me alone,'
            'go away,' or 'I'm not discussing this with you.'
          </li>
          <li>
            Someone's refusal to explain or debate social justice concepts
          </li>
          <li>
            Criticisms of racist, sexist, cissexist, or otherwise oppressive
            behavior or assumptions
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>Enforcement</h2>
        <p>
          Violations of the Code of Conduct may be reported by contacting the
          team via the
          <a href="#"> abuse report</a> system. All complaints will be reviewed
          and investigated and will result in a response that is deemed
          necessary and appropriate to the circumstances. Further details of
          specific enforcement policies may be posted separately.
        </p>
        <p>
          Moderators have the right and responsibility to remove comments or
          other contributions that are not aligned to this Code of Conduct or to
          suspend temporarily or permanently any members for other behaviors
          that they deem inappropriate, threatening, offensive, or harmful.
        </p>
        <p>
          If you agree with our values and would like to help us enforce the
          Code of Conduct, you might consider volunteering as a DEV moderator.
          Please check out the
          <a href="#"> DEV Community Moderation page</a> for information about
          our moderator roles and how to become a mod.
        </p>
      </div>

      <div className="attribution">
        <h2>Attribution</h2>
        <p>This Code of Conduct is adapted from:</p>
        <ul>
          <li>
            <a href="#">Contributor Covenant, version 1.4</a>
          </li>
          <li>
            <a href="#">Write/Speak/Code</a>
          </li>
          <li>
            <a href="#">Geek Feminism</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CodeOfConduct;
