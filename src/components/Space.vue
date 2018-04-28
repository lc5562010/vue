<template>
    <div>
        <Row>
            <Col span="24">
                <Button @click="modal = true" style="float:right;">添加空间</Button>
            </Col>
        </Row>
        <Row>
            <Col span="24" style="padding-top:20px;">
                <Table border :columns="columns" :data="dataTable" highlight-row :loading="loading"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="pageTotal" :current="pageNum" @on-change="changePage" @on-page-size-change="handlePage" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="pageSizeOpts"></Page>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal
            :styles="{top: '20px'}"
            title="空间信息"
            v-model="modal"
            :transfer="false"
            :closable="false"
            :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="空间名称" prop="spaceName">
                    <Input v-model="formValidate.spaceName" placeholder="请输入空间名称"></Input>
                </FormItem>
                <FormItem label="空间简介" prop="spaceDescribe">
                    <Input v-model="formValidate.spaceDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入空间简介"></Input>
                </FormItem>
                <FormItem label="所在城市" prop="city">
                    <Select v-model="formValidate.city" placeholder="请选择城市" filterable>
                        <Option value="北京">北京</Option>
                        <Option value="上海">上海</Option>
                        <Option value="深圳">深圳</Option>
                    </Select>
                </FormItem>
                <FormItem label="详细地址" prop="spaceSite">
                    <Input v-model="formValidate.spaceSite" placeholder="详细到门牌号码"></Input>
                </FormItem>
                <FormItem label="固定电话" prop="fixPhone">
                    <Input v-model="formValidate.fixPhone" placeholder="请输入固定电话"></Input>
                </FormItem>
                <FormItem label="经理姓名" prop="relationName">
                    <Input v-model="formValidate.relationName" placeholder="请输入经理姓名"></Input>
                </FormItem>
                <FormItem label="经理电话" prop="relationTel">
                    <Input v-model="formValidate.relationTel" placeholder="请输入经理电话"></Input>
                </FormItem>
                <FormItem label="空间状态" prop="spaceState">
                    <RadioGroup v-model="formValidate.spaceState">
                        <Radio label="0">运营中</Radio>
                        <Radio label="1">未运营</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="创建时间">
                    <Row>
                        <Col span="11">
                            <FormItem prop="creationTime">
                                <DatePicker type="date" placeholder="Select date" v-model="formValidate.creationTime"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="开放时间" prop="openingHours">
                    <TimePicker type="timerange" placement="bottom-end" v-model="formValidate.openingHours" placeholder="Select time" style="width: 168px"></TimePicker>
                </FormItem>
                <FormItem label="工位数量" prop="stationNum">
                    <Input v-model="formValidate.stationNum" placeholder="请输入工位数量（个）"></Input>
                </FormItem>
                <FormItem label="线上工位价格" prop="onlineLocationPrice">
                    <Input v-model="formValidate.onlineLocationPrice" placeholder="请输入工位价格（元）"></Input>
                </FormItem>
                <FormItem label="容纳人数" prop="manNum">
                    <Input v-model="formValidate.manNum" placeholder="请输入容纳人数（位）"></Input>
                </FormItem>
            </Form>
            <!-- 图片上传 -->
            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="'http://192.168.1.116:8080/workOrder/' + item.response.msg.fileAddress">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.response.msg.fileAddress)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                name="file"
                type="drag"
                action="http://192.168.1.116:8080/workOrder/Workorder/uploading"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'http://192.168.1.116:8080/workOrder/' + imgName" v-if="visible" style="width: 100%">
            </Modal>
            <div slot="footer">
                <Button type="text" size="large" @click="handleReset('formValidate')">取消</Button>
                <Button type="primary" size="large" @click="handleSubmit('formValidate')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            // 手机号和开放时间的验证规则函数
            const sexadecimal = (rule, val, callback) => {
                if(!(/^1[34578]\d{9}$/.test(val))) {
                    callback(new Error('手机号格式错误'));
                } else {
                    callback();
                }
            };
            const ruleopeningHours = (rule, val, callback) => {
                if(val[0] == "" && val[1] == "") {
                    callback(new Error('请输入开放时间'));
                } else {
                    callback();
                }
            };
            return {
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],  //图片上传
                modal: false,       //模态框开关
                formValidate: {     //表单数据
                    spaceName: '',
                    spaceDescribe: '',
                    spaceSite: '',
                    city: '',
                    fixPhone: '',
                    relationName: '',
                    relationTel: '',
                    spaceState: '',
                    creationTime: '',
                    openingHours: ["",""],
                    stationNum: '',
                    onlineLocationPrice: '',
                    manNum: '',
                    staffId: 1
                },
                ruleValidate: {     //表单验证规则
                    spaceName: [
                        { required: true, message: '请输入空间名称', trigger: 'blur' }
                    ],
                    spaceDescribe: [
                        { required: true, message: '请输入空间简介', trigger: 'blur' },
                        { type: 'string', max: 500, message: '最多500字', trigger: 'blur' }
                    ],
                    spaceSite: [
                        { required: true, message: '请输入空间详细地址', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择空间所在城市', trigger: 'change' }
                    ],
                    fixPhone: [
                        { pattern: /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/, message: '电话格式错误', trigger: 'blur' }
                    ],
                    relationName: [
                        { required: true, message: '请输入经理姓名', trigger: 'blur' }
                    ],
                    relationTel: [
                        { required: true, message: '请输入经理电话', trigger: 'blur' },
                        { validator: sexadecimal, trigger: 'blur' }
                    ],
                    spaceState: [
                        { required: true, message: '请选择空间状态', trigger: 'change' }
                    ],
                    creationTime: [
                        { required: true, type: 'date', message: '请选择创建日期', trigger: 'change' }
                    ],
                    openingHours: [
                        { validator: ruleopeningHours, trigger: 'change' }
                    ],
                    stationNum: [
                        { required: true, message: '请输入工位数量', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur', transform(value) {
                            return Number(value);
                        } }
                    ],
                    onlineLocationPrice: [
                        { required: true, message: '请输入线上工位价格', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur',transform(value) {
                            return Number(value);
                        } }
                    ],
                    manNum: [
                        { required: true, message: '请输入容纳人数', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur',transform(value) {
                            return Number(value);
                        } }
                    ]
                },
                columns: [  //表格属性
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '空间名称',
                        key: 'spaceName',
                        sortable: true
                    },
                    {
                        title: '创建时间',
                        key: 'creationTime',
                        sortable: true
                    },
                    {
                        title: '经理姓名',
                        key: 'relationName',
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
                pageTotal: 0,   //分页总条数
                pageNum: 1,     //分页页码
                pageSize: 10,     //每页条数
                pageSizeOpts: [2,3,4,5,10],  //每页条数设置
                dataTable: [],    //表格数据
                loading: true,    //表格loading
            }
        },
        methods: {
            handleSubmit (name) {   //提交表单事件
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        let _that = this;
                        this.$http({
                            url: '/SKwork/Space/addSpace',
                            method: 'post',
                            data: this.formValidate,
                            transformRequest: [function (data) {
                                let d = new Date(data.creationTime);
                                data.openingHours = data.openingHours[0] + '-' + data.openingHours[1];
                                data.creationTime = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' 00:00:00';
                                let ret = '';
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                                }
                                return ret;
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then(function (response) {
                            console.log(response);
                            if(response.data.result === "成功") {
                                _that.loading = true;
                                _that.requestSpace();
                                _that.$refs["formValidate"].resetFields();
                                _that.modal = false;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {    //重置表单事件
                this.$refs[name].resetFields();
                this.modal = false;
            },
            show (index) {  //修改事件
                this.modal = true;
                this.formValidate = {    
                    spaceId: this.dataTable[index].spaceId,
                    spaceName: this.dataTable[index].spaceName,
                    spaceDescribe: this.dataTable[index].spaceDescribe,
                    spaceSite: this.dataTable[index].spaceSite,
                    city: this.dataTable[index].city,
                    fixPhone: this.dataTable[index].fixPhone,
                    relationName: this.dataTable[index].relationName,
                    relationTel: this.dataTable[index].relationTel,
                    spaceState: this.dataTable[index].spaceState + '',
                    creationTime: this.dataTable[index].creationTime,
                    openingHours: [this.dataTable[index].openingHours.split('-')[0],this.dataTable[index].openingHours.split('-')[1]],
                    stationNum: this.dataTable[index].stationNum + '',
                    onlineLocationPrice: this.dataTable[index].onlineLocationPrice + '',
                    manNum: this.dataTable[index].manNum + '',
                    staffId: 1
                }
            },
            remove (index) {    //删除
                let _that = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认要进行此操作吗？</p>',
                    onOk: () => {
                        // this.$Message.info('Clicked ok');
                        this.$http({
                            url: '/SKwork/Space/deleteSpace',
                            method: 'post',
                            data: {spaceId:this.dataTable[index].spaceId,staffId:1},
                            transformRequest: [function (data) {
                                let ret = '';
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                                }
                                return ret;
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then(function (response) {
                            console.log(response);
                            if(response.data.result === "成功") {
                                _that.loading = true;
                                _that.requestSpace();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    },
                    onCancel: () => {
                        this.$Message.info('您取消了操作！');
                    }
                });
                // this.dataTable.splice(index, 1);
            },
            requestSpace () {     //请求表格数据
                let _that = this;
                this.$http({
                    url: '/SKwork/Space/find',
                    method: 'post',
                    data: {pageNo:this.pageNum,pageSize:this.pageSize,staffId:1},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                        }
                        return ret;
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    console.log(response);
                    if(response.data.result === "成功") {
                        _that.loading = false;
                        _that.dataTable = response.data.msg.list;
                        _that.pageTotal = response.data.msg.totalRecords;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            changePage (value) {    //分页页码点击事件
                this.pageNum = value;  
                this.loading = true;
                this.requestSpace();
            },
            handlePage (value) {    //分页条数改变事件
                this.pageSize = value;
                this.loading = true;
                this.requestSpace();
            },
            handleView (name) {   //查看大图//以下都是图片上传
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {   //删除图片
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res,) {
                console.log(res);
                console.log(this.uploadList);
            },
            handleFormatError () {  //校验文件格式
                this.$Message.warning('图片格式错误！！');
            },
            handleMaxSize () {   //校验文件大小
                this.$Message.warning('您最多可以上传2M大小的文件！！');
            },
            handleBeforeUpload () {    //文件上传之前校验文件数量
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Message.warning('您最多只能上传5张图片！！');
                }
                return check;
            }
        },
        mounted () {
            this.requestSpace();
            this.uploadList = this.$refs.upload.fileList;  //图片上传
        }
    }
</script>
<style lang="less" scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>


