import { useForm } from 'react-hook-form';

function App() {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchData = async () => {
        console.log('fetchData started');
        await delay(2000); // 延遲2秒
        console.log('fetchData ended');
        return 'data';
    };

    const processData = async () => {
        console.log('processData started');
        const data = await fetchData();
        console.log(`Data: ${data}`);
        console.log('processData ended');
    };

    console.log('Script started');
    processData();
    console.log('Script ended');

    const time1 = () => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log('1000');
                resolve();
            }, 1000);
        });
    };
    const time2 = () => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log('2000');
                resolve();
            }, 2000);
        });
    };
    const time3 = () => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log('3000');
                resolve();
            }, 3000);
        });
    };

    const tryAsyncAwait = async () => {
        await time2();
        await time3();
        await time1();
    };

    const { register, handleSubmit } = useForm();
    const { register: otherRegister, handleSubmit: otherHandleSubmit } = useForm();

    const promise = new Promise((resolve, reject) => {
        try {
            fetch('https://random-word-api.herokuapp.com/word')
                .then((res) => res.json())
                .then((res) => resolve(res[0]));
        } catch (err) {
            reject(err);
        }
    });

    const myAge = (year: number) => {
        return new Promise((resolve, reject) => {
            const currentYear = new Date().getFullYear();
            const age = currentYear - year;
            resolve(age);
        });
    };

    const submit = async () => {
        let oneData: any;
        let twoData: any;
        await Promise.all([
            handleSubmit((data) => (oneData = data))(),
            otherHandleSubmit((data) => (twoData = data))(),
        ]);
        console.log(oneData);
        console.log(twoData);
        promise
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.log(error));
        const garyAge = await myAge(1997);
    };

    return (
        <>
            <button onClick={tryAsyncAwait}>123</button>
            <input type="text" {...register('oneName')} />
            <input type="text" {...register('oneAge')} />
            <input type="text" {...otherRegister('twoName')} />
            <input type="text" {...otherRegister('twoAge')} />
            <button type="button" onClick={submit}>
                submit
            </button>
        </>
    );
}

export default App;
