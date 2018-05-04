// 导入依赖的插件
var MockAdapter = require('axios-mock-adapter');
// 导入请求方法
var axios = require('axios');
// 实例化对象
var mock = new MockAdapter(axios);

import {Users} from "./data/person"
import {Locks} from "./data/lock"
// 模拟请求接口和返回数据
// arguments (status == 响应状态, data == 响应数据, headers == 响应头部信息)
mock.onGet('/users').reply(200, {
    code: 1001, msg: '请求成功', Users
});

mock.onGet('/locks').reply(200, {
    code: 1001, msg: '请求成功', Locks
});

const powerLock = [
    {
        id: 1,
        lock: '门禁设备1',
        person: '张虎，李旺，韩雨桐'
    },
    {
        id: 2,
        lock: '门禁设备2',
        person: '宋梦竹，龚芃旭，刘傲天，郑一卓'
    },
    {
        id: 3,
        lock: '门禁设备3',
        person: '吴瑞航，赵熙成，刘雨熙，郭东来，杨舒幻'
    },
    {
        id: 4,
        lock: '门禁设备4',
        person: '丁文博，王一涵，李清照，李忠艳'
    },
    {
        id: 5,
        lock: '门禁设备5',
        person: '乔峰，段誉，虚竹，慕容复，王语嫣，游坦之'
    },
    {
        id: 6,
        lock: '门禁设备6',
        person: '郭靖，黄蓉，杨康，洪七公，黄药师，欧阳锋'
    },
    {
        id: 7,
        lock: '门禁设备7',
        person: '张无忌，赵敏，张三丰，周芷若，韦一笑'
    },
    {
        id: 8,
        lock: '门禁设备8',
        person: '杨过，小龙女，李莫愁，周伯通'
    },
    {
        id: 9,
        lock: '门禁设备9',
        person: '令狐冲，风清扬，林平之'
    },
    {
        id: 10,
        lock: '门禁设备10',
        person: '李白，杜甫，李商隐，白居易，杜牧'
    },
]
mock.onGet('/powerLock').reply(200, {
    code: 1001, msg: '请求成功', powerLock
});

const powerPerson = [
    {
        id: 1,
        person: '张三',
        lock: '门禁设备1，门禁设备2，门禁设备3'
    },
    {
        id: 2,
        person: '李四',
        lock: '门禁设备3，门禁设备4，门禁设备6，门禁设备7'
    },
    {
        id: 3,
        person: '王五',
        lock: '门禁设备5，门禁设备8，门禁设备11，门禁设备13，门禁设备14'
    },
    {
        id: 4,
        person: '赵六',
        lock: '门禁设备6，门禁设备9，门禁设备10，门禁设备12'
    },
    {
        id: 5,
        person: '孙七',
        lock: '门禁设备1，门禁设备7，门禁设备9，门禁设备12，门禁设备15，门禁设备16'
    },
    {
        id: 6,
        person: '周八',
        lock: '门禁设备10，门禁设备13，门禁设备17，门禁设备18'
    },
    {
        id: 7,
        person: '吴九',
        lock: '门禁设备12，门禁设备19，门禁设备20'
    },
    {
        id: 8,
        person: '郑十',
        lock: '门禁设备21，门禁设备22，门禁设备23，门禁设备24，门禁设备25'
    },
    {
        id: 9,
        person: '刘备',
        lock: '门禁设备20，门禁设备23，门禁设备26，门禁设备27'
    },
    {
        id: 10,
        person: '关羽',
        lock: '门禁设备25，门禁设备28，门禁设备29，门禁设备30，门禁设备31，门禁设备32'
    },        
]
mock.onGet('/powerPerson').reply(200, {
    code: 1001, msg: '请求成功', powerPerson
});
// 导出
export default mock;