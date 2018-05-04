<template>
    <div>
        <Row>
            <Col span="24">
                <Input style="width:200px;float:left;" placeholder="请输入员工姓名">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
                <Button @click="modal = true" style="float:right;">添加人员</Button>
            </Col>
        </Row>
        <Row>
            <Col span="24" style="padding-top:20px;">
                <Table border :columns="columns" :data="dataTable" highlight-row></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="pageTotal" :current="pageNum" @on-change="changePage" @on-page-size-change="handlePage" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="pageSizeOpts"></Page>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            columns: [  //表格属性
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '员工姓名',
                    key: 'personName',
                    sortable: true
                },
                {
                    title: '员工年龄',
                    key: 'personAge',
                    sortable: true
                },
                {
                    title: '员工性别',
                    key: 'personSex',
                    sortable: true
                },
                {
                    title: '员工电话',
                    key: 'personTel',
                    sortable: true
                },
                {
                    title: '创建时间',
                    key: 'creationTime',
                    sortable: true
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            dataTable: [
                {
                    personName: '胡安捷',
                    personAge: 25,
                    personSex: '女',
                    personTel: 18569874563,
                    creationTime: '2017-12-25'
                },
                {
                    personName: '李虎翼',
                    personAge: 19,
                    personSex: '男',
                    personTel: 15569652335,
                    creationTime: '2017-12-15'
                },
                {
                    personName: '刘铪功',
                    personAge: 28,
                    personSex: '男',
                    personTel: 18856411129,
                    creationTime: '2017-09-06'
                },
                {
                    personName: '石宇驰',
                    personAge: 23,
                    personSex: '男',
                    personTel: 15569568896,
                    creationTime: '2018-02-10'
                },
                {
                    personName: '赵亮亮',
                    personAge: 25,
                    personSex: '男',
                    personTel: 15698744159,
                    creationTime: '2018-03-08'
                },
            ],    //表格数据
            pageTotal: 0,   //分页总条数
            pageNum: 1,     //分页页码
            pageSize: 10,     //每页条数
            pageSizeOpts: [5,10,15],  //每页条数设置
        }
    },
    methods: {
        requestPerson () {
            let _that = this;
            let base = ''
            axios.get(`${base}/users`).then(function(response) {
                console.log(response);
                _that.dataTable = response.data.Users;
                _that.pageTotal = 100;
            })  
        }
    },
    mounted () {
        this.requestPerson();
    } 
}
</script>
