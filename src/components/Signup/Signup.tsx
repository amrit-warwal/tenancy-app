import Button, { ButtonProps } from '@/components/Button/Button';
import Input, { InputProps } from '@/components/Input/Input';
import styles from './Signup.module.scss';

const nameInputConfig: InputProps = {
    showLabel: true,
    inputConfig: {
        type: 'text',
        placeholder: 'Enter your name',
    },
    labelConfig: {
        labelText: 'Name',
    },
};

const emailInputConfig: InputProps = {
    showLabel: true,
    inputConfig: {
        type: 'email',
        placeholder: 'Enter your email',
    },
    labelConfig: {
        labelText: 'Email',
    },
};

const passwordInputConfig: InputProps = {
    showLabel: true,
    inputConfig: {
        type: 'password',
        placeholder: 'Enter your password',
    },
    labelConfig: {
        labelText: 'Password',
    },
};

const buttonConfig: ButtonProps = {
    text: 'Sign Up',
    type: 'submit',
};

function Signup() {
    return (
        <div className={styles.signup}>
            <h1 className={styles.formHeading}>Signup</h1>
            <form className={styles.form}>
                {[nameInputConfig, emailInputConfig, passwordInputConfig].map((config, index) => (
                    <Input
                        key={index}
                        showLabel={config.showLabel}
                        inputConfig={config.inputConfig}
                        labelConfig={config.labelConfig}
                    />
                ))}
                <Button text={buttonConfig.text} type={buttonConfig.type} />
            </form>
        </div>
    );
}
export default Signup;
