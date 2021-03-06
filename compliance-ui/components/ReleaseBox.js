import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import Link from "next/link";

const releaseBoxPassing = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};
  margin-bottom: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colour.greenLight};
  }

  time {
    margin: 0;
    font-size: ${theme.font.sm};
    color: ${theme.colour.blackLight};
    font-weight: 700;
  }

  div[name="inner-container"] {
    display: flex;
    font-size: ${theme.font.lg};
    color: ${theme.colour.black};
    justify-content: space-between;
    margin-bottom: ${theme.spacing.xs};
  }

  ${mediaQuery.md(css`
    div[name="inner-container"] {
      display: block;
    }
  `)};

  ${mediaQuery.sm(css`
    p {
      font-size: ${theme.font.xs};
    }
  `)};
`;

const releaseBoxFailing = css`
  ${releaseBoxPassing};
  &:hover {
    background: ${theme.colour.redLight};
  }
`;

const passingText = css`
  color: ${theme.colour.white};
  background: ${theme.colour.greenDark};
  margin-left: ${theme.spacing.sm};
  padding: ${theme.spacing.xs};
  font-size: ${theme.font.sm};
  border-radius: 5px;

  ${mediaQuery.md(css`
    margin: 0 ${theme.spacing.sm} 0 0;
  `)};

  ${mediaQuery.sm(css`
    font-size: ${theme.font.xs};
    padding: ${theme.spacing.xs};
  `)};
`;

const failingText = css`
${passingText}
  background: ${theme.colour.redDark};

`;

const releaseTitlePassing = css`
  width: 40rem;

  h2[name="releasebox-title"] {
    font-size: ${theme.font.lg};
    margin: 0 0 0.3rem 0;
    color: ${theme.colour.greenDark};
  }

  ${mediaQuery.md(css`
    width: 100%;
  `)};

  ${mediaQuery.sm(css`
    h2[name="releasebox-title"] {
      font-size: ${theme.font.md};
    }
  `)};
`;

const releaseTitleFailing = css`
  ${releaseTitlePassing}

  h2[name="releasebox-title"] {
    color: ${theme.colour.redDark};
  }
`;
const releaseBadges = css`
  width: 15rem;
  font-weight: 700;
  text-align: right;

  ${mediaQuery.md(css`
    text-align: left;
    width: 100%;
    margin-top: ${theme.spacing.lg};
  `)};

  ${mediaQuery.sm(css`
    margin-top: ${theme.spacing.md};
  `)};
`;

const passingFocus = css`
  a:focus {
    outline: 0;

    div[name="release-box"] {
      outline-offset: -4px;
      outline: 4px solid ${theme.colour.greenDark};
    }
  }
`;
const failingFocus = css`
  a:focus {
    outline: 0;

    div[name="release-box"] {
      outline-offset: -4px;
      outline: 4px solid ${theme.colour.redDark};
    }
  }
`;

const ReleaseBox = ({ release, timestamp, passed, passing, total, link }) => {
  const status = passed === "true" ? "Passed" : "Failed";
  return (
    <li
      tabIndex="-1"
      className={passed === "true" ? passingFocus : failingFocus}
    >
      <a tabIndex="0" name="releasebox-link" href={link}>
        <div
          aria-label={`${status} release #: ${release}, ${passing} out of ${total} checks passing, timestamp: ${timestamp}`}
          name="release-box"
          className={passed === "true" ? releaseBoxPassing : releaseBoxFailing}
        >
          <div name="inner-container">
            <div
              className={
                passed === "true" ? releaseTitlePassing : releaseTitleFailing
              }
            >
              <h2 name="releasebox-title">
                {passed === "true" ? "Passed" : "Failed"} release: #{release}
              </h2>{" "}
              <time name="releasebox-timestamp">{timestamp}</time>
            </div>
            <div name="release-badges" className={releaseBadges}>
              <span
                name="releasebox-passing"
                className={passed === "true" ? passingText : failingText}
              >
                {passing} / {total} checks
              </span>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default ReleaseBox;
