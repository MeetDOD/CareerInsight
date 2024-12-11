import { atom } from 'recoil';

export const categoryState = atom({
    key: 'categoryState',
    default: '',
});

export const topicState = atom({
    key: 'topicState',
    default: '',
});

export const descriptionState = atom({
    key: 'descriptionState',
    default: '',
});

export const optionsState = atom({
    key: 'optionsState',
    default: {
        difficulty: '',
        duration: '',
        chapters: '',
        language: '',
    },
});

export const finalCourseState = atom({
    key: 'finalCourseState',
    default: {
        courseName: '',
        duration:'',
        chapters: [],
        thumbnail:''
    },
});

export const responseState = atom({
    key: 'responseState',
    default: null,
});
