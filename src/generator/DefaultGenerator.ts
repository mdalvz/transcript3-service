import { AccountRecord } from '../record/AccountRecord';
import { ClassRecord } from '../record/ClassRecord';
import { TranscriptRecord } from '../record/TranscriptRecord';
import { BaseGenerator } from './BaseGenerator';

export class DefaultGenerator extends BaseGenerator {

  public constructor(
    account: AccountRecord, 
    transcript: TranscriptRecord,
    classes: ClassRecord[]) {

    super(account, transcript, classes);
  }

  public async onGenerate() {
    let body = this.document.body;
    body.style.display        = 'flex';
    body.style.flexDirection  = 'column';
    body.style.padding        = '0';
    body.style.margin         = '0';
    body.style.fontFamily     = 'Arial';
    body.style.fontSize       = '10px';
    body.appendChild(this.generateRoot());
  }

  private generateRoot(): HTMLElement {

    let root = this.document.createElement('div');
    root.style.display        = 'flex';
    root.style.flexDirection  = 'column';
    root.style.border         = '1px solid black';

    root.appendChild(this.generateHeader());
    root.appendChild(this.generateInformation());
    root.appendChild(this.generateCoursework());

    return root;

  }

  private generateHeader(): HTMLElement {

    let header = this.document.createElement('div');
    header.style.display              = 'grid';
    header.style.gridTemplateColumns  = '50px 1fr 50px';

    let left = this.document.createElement('div');
    header.appendChild(left);

    let center = this.document.createElement('div');
    center.style.display        = 'flex';
    center.style.flexDirection  = 'column';
    center.style.justifyContent = 'center';
    center.style.alignItems     = 'center';
    header.appendChild(center);

    let centerInner = this.document.createElement('div');
    centerInner.innerHTML = this.transcript.transcriptTitle;
    centerInner.style.fontSize    = '14px';
    centerInner.style.fontWeight  = 'bold';
    centerInner.style.textAlign   = 'center';
    center.appendChild(centerInner);

    let right = this.document.createElement('img');
    right.src = "data:image/jpeg;base64,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"
    right.style.width       = '48px';
    right.style.padding     = '1px';
    right.style.aspectRatio = '1 / 1';
    right.style.objectFit   = 'contain';
    header.appendChild(right);

    return header;

  }

  private generateInformation(): HTMLElement {

    let container = this.document.createElement('div');
    container.style.padding             = '10px 20px';
    container.style.paddingTop          = '0';
    container.style.display             = 'grid';
    container.style.gap                 = '20px';
    container.style.gridTemplateColumns = '1fr 1fr';

    container.appendChild(this.generateStudentInformation());
    container.appendChild(this.generateSchoolInformation());

    return container;

  }

  private generateStudentInformation(): HTMLElement {

    let container = this.document.createElement('div');
    container.style.display       = 'flex';
    container.style.flexDirection = 'column';

    let studentName = this.generateStudentName();
    if (studentName) {
      container.appendChild(this.generateInformationEntry(
        'Student Name', studentName
      ));
    }
    if (this.transcript.studentBirthDate) {
      container.appendChild(this.generateInformationEntry(
        'Birth Date', this.transcript.studentBirthDate
      ));
    }
    if (this.transcript.studentGraduationDate) {
      container.appendChild(this.generateInformationEntry(
        'Graduation Date', this.generateStudentGraduationDate()
      ));
    }
    if (this.transcript.studentAddress) {
      container.appendChild(this.generateInformationEntry(
        'Student Address', this.transcript.studentAddress
      ));
    }
    if (this.transcript.studentPhone) {
      container.appendChild(this.generateInformationEntry(
        'Student Phone', this.transcript.studentPhone
      ));
    }
    if (this.transcript.studentEmail) {
      container.appendChild(this.generateInformationEntry(
        'Student Email', this.transcript.studentEmail
      ));
    }
    
    return container;

  }

  private generateStudentName(): string {
    return [
      this.transcript.studentNameFirst,
      this.transcript.studentNameMiddle,
      this.transcript.studentNameLast,
      this.transcript.studentNameSuffix,
    ].filter((e, _) => e.length > 0).join(' ');
  }

  private generateStudentGraduationDate(): string {
    let currentYear = new Date().getFullYear();
    let graduationYear = parseInt(this.transcript.studentGraduationDate);
    if (isNaN(graduationYear)) {
      throw new Error('Invalid student graduation year');
    }
    if (graduationYear > currentYear) {
      return `expected ${graduationYear}`;
    } else {
      return `${graduationYear}`;
    }
  }

  private generateSchoolInformation(): HTMLElement {

    let container = this.document.createElement('div');
    container.style.display       = 'flex';
    container.style.flexDirection = 'column';

    if (this.transcript.schoolName) {
      container.appendChild(this.generateInformationEntry(
        'School Name', this.transcript.schoolName
      ));
    }
    if (this.transcript.schoolAddress) {
      container.appendChild(this.generateInformationEntry(
        'School Address', this.transcript.schoolAddress
      ));
    }
    if (this.transcript.adminTitle) {
      if (this.transcript.adminName) {
        container.appendChild(this.generateInformationEntry(
          this.transcript.adminTitle, this.transcript.adminName
        ));
      }
      if (this.transcript.adminPhone) {
        container.appendChild(this.generateInformationEntry(
          `${this.transcript.adminTitle} Phone`, this.transcript.adminPhone
        ));
      }
      if (this.transcript.adminEmail) {
        container.appendChild(this.generateInformationEntry(
          `${this.transcript.adminTitle} Email`, this.transcript.adminEmail
        ));
      }
    }

    return container;

  }

  private generateInformationEntry(leftContent: string, rightContent: string): HTMLElement {

    let entry = this.document.createElement('div');
    entry.style.display             = 'grid';
    entry.style.gridTemplateColumns = '120px 1fr';

    let left = this.document.createElement('div');
    left.innerHTML = `${leftContent}:`;
    left.style.fontWeight = 'bold';
    entry.appendChild(left);

    let right = this.document.createElement('div');
    right.innerHTML = `${rightContent}`;
    entry.appendChild(right);

    return entry;

  }

  private generateCoursework(): HTMLElement {
    if (this.transcript.arrangeByGrade) {
      return this.generateCourseworkBySubject();
    } else {
      return this.generateCourseworkBySubject();
    }
  }

  private generateCourseworkBySubject(): HTMLElement {

    let container = this.document.createElement('div');
    container.style.display             = 'grid';
    container.style.gridTemplateColumns = '1.5fr 50px 1fr 100px 50px 50px 60px 50px';

    container.appendChild(this.generateCourseworkHeaderCell(
      'Subjects / Courses',
      false
    ));
    container.appendChild(this.generateCourseworkHeaderCell(
      'Grade Level',
      false
    ));
    container.appendChild(this.generateCourseworkHeaderCell(
      'Course Provider',
      false
    ));
    container.appendChild(this.generateCourseworkHeaderCell(
      'Term',
      false
    ));
    container.appendChild(this.generateCourseworkHeaderCell(
      'Type',
      false
    ));
    container.appendChild(this.generateCourseworkHeaderCell(
      'Grade',
      false
    ));
    container.appendChild(this.generateCourseworkHeaderCell(
      'Credit Attempted',
      false
    ));
    container.appendChild(this.generateCourseworkHeaderCell(
      'Credit Awarded',
      false
    ));

    let subjects = [
      'English Language Arts',
      'Mathematics',
      'Social Studies',
      'Science',
      'World Languages',
      'Arts',
      'Physical Education',
      'Electives',
    ];
    let classes = new Map<string, ClassRecord[]>();
    for (let e of this.classes) {
      if (subjects.indexOf(e.subject) < 0) {
        throw new Error(`Invalid subject "${e.subject}"`);
      }
      if (classes.has(e.subject)) {
        classes.get(e.subject)?.push(e);
      } else {
        classes.set(e.subject, [e]);
      }
    }

    for (let subject of subjects) {

      let subjectClasses = classes.get(subject);
      if (!subjectClasses || subjectClasses.length === 0) {
        continue;
      }
      let totalAttempted = subjectClasses
        .map((e, i, a) => e.attempted)
        .reduce((a, b) => a + b, 0);
      let totalAwarded = subjectClasses
        .map((e, i, a) => e.awarded)
        .reduce((a, b) => a + b, 0);

      container.appendChild(this.generateCourseworkHeaderCell(
        subject,
        true
      ));
      for (let i = 0; i < 5; ++i) {
        container.appendChild(this.generateCourseworkHeaderCell(
          '',
          true
        ));
      }
      container.appendChild(this.generateCourseworkHeaderCell(
        `${totalAttempted}`,
        true
      ));
      container.appendChild(this.generateCourseworkHeaderCell(
        `${totalAwarded}`,
        true
      ));

      subjectClasses.sort((a, b) => a.level - b.level);

      for (let e of subjectClasses) {
        container.appendChild(this.generateCourseworkCell(
          e.name,
          false
        ));
        container.appendChild(this.generateCourseworkCell(
          e.level === 0 ? 'K' : `${e.level}`,
          true
        ));
        container.appendChild(this.generateCourseworkCell(
          e.provider,
          false
        ));
        container.appendChild(this.generateCourseworkCell(
          `${e.term} ${e.year}`,
          true
        ));
        container.appendChild(this.generateCourseworkCell(
          `${e.type}`,
          true
        ));
        container.appendChild(this.generateCourseworkCell(
          `${e.grade}`,
          true
        ));
        container.appendChild(this.generateCourseworkCell(
          `${e.attempted === 0 ? '' : e.attempted}`,
          true
        ));
        container.appendChild(this.generateCourseworkCell(
          `${e.attempted === 0 ? '' : e.awarded}`,
          true
        ));
      }
      
    }

    return container;

  }

  private generateCourseworkHeaderCell(content: string, sub: boolean): HTMLElement {

    let container = this.document.createElement('div');
    container.style.display         = 'flex';
    container.style.flexDirection   = 'column';
    container.style.justifyContent  = 'center';
    container.style.alignItems      = 'center';
    container.style.backgroundColor = !sub ? 'rgb(221, 221, 221)' : 'rgb(238, 238, 238)';
    container.style.fontWeight      = 'bold';
    container.style.padding         = !sub ? '5px' : '2px';

    let inner = this.document.createElement('div');
    inner.innerHTML = `${content}`;
    inner.style.textAlign = 'center';
    container.appendChild(inner);

    return container;

  }

  private generateCourseworkCell(content: string, center: boolean): HTMLElement {

    let container = this.document.createElement('div');
    container.style.textAlign = !center ? 'left' : 'center';
    container.style.padding   = '2px';
    container.innerHTML = `${content}`;

    return container;

  }

}
