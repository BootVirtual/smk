

export default function Page() {
    return (
        <div>
            <h1>SMK Demo</h1>
            <br />
            <p>This is a demo of the SMK project by marctg (aka BootVirtual). <a href="https://github.com/BootVirtual/smk">Click here for GitHub.</a></p>
            <p>Please note that this is still a prototype/WIP. Not all features are ready. For more information on the software please consult the README.md in the repository linked above.</p>
            <p>This demo includes a small dataset including two separate classes and 6 sample users as follows:</p>
            <br />
            <p>Student Smith - Student in 10B - ssmith@example.com</p>
            <p>Student Jones - Student in 10C - sjones@example.com</p>
            <p>Parent Smith - Parent of Student Smith - psmith@example.com</p>
            <p>Parent Jones - Parent of Student Jones - pjones@example.com</p>
            <p>Teacher Brown - Headteacher of 10B + regular teacher of 10C - tbrown@example.com</p>
            <p>Teacher Williams - Headteacher of 10C + regular teacher of 10B - twilliams@example.com</p>
            <br />
            <p>The password for all of them is 12345678. Feel free to log in and snoop around. I'd appreciate suggestions via GitHub Issues or Slack (HackClub @marctg). Please mind that following things do have an interface corespondent but are not implemented (as in the button exists but won't do anything):</p>
            <br />
            <p>Forgot Password</p>
        </div>
    );
}