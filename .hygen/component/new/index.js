module.exports = {
    prompt: ({ inquirer, args }) => {
        const questions = [
            {
                type: 'select',
                name: 'category',
                message: 'アトミックデザインカテゴリを選択してください',
                choices: ['atoms', 'molecules', 'organisms', 'templates']
            },
            {
                type: 'input',
                name: 'component_name',
                message: 'コンポーネントの名前を入力してください',
            },
            {
                type: 'input',
                name: 'dir',
                message: 'ディレクトリはどこにしますか？ (空白可)',
            },
            {
                type: 'confirm',
                name: 'have_style',
                message: 'スタイルはありますか？',
            },
            {
                type: 'confirm',
                name: 'have_props',
                message: 'propsはありますか？',
            },
            {
                type: "confirm",
                name: "have_consts",
                message: "定数定義はありますか?",
            },
            {
                type: 'confirm',
                name: 'have_hook',
                message: 'hooksはありますか？',
            },
            {
                type: "confirm",
                name: "have_type",
                message: "typeはありますか？",
            },
            {
                type: "confirm",
                name: "memoize",
                message: "コンポーネントをメモ化しますか？",
            },
        ];
        return inquirer.prompt(questions).then((answers) => {
            const { category, component_name, dir, have_type } = answers;
            const path = `${category}/${dir ? `${dir}/` : ``}${component_name}`;
            const abs_path = `src/components/${path}`;
            const type_annotate = have_type ? "React.FC<Props>" : "React.FC";
            const props = have_type ? "(props)" : "()";
            return { ...answers, path, abs_path, type_annotate, props };
        });
    },
};
