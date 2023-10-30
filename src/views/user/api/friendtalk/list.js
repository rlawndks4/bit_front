import { Col, Row, Title2, Title3 } from "src/components/elements/styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const req_table_head = [
    '키',
    '설명',
    '필수',
    '타입',
];
const req_table_body = [
    ['api_key', '인증용 API Key', 'O', 'String'],
    ['user_id', '사용자id', 'O', 'String'],
    ['page', '페이지번호', 'X(기본 1)', 'Integer'],
    ['page_size', '페이지당 출력갯수', 'X(기본 30) 30~500', 'Integer'],
    ['s_dt', '조회시작일자', 'X', 'yyyy-mm-dd'],
    ['e_dt', '조회마감일자', 'X', 'yyyy-mm-dd'],
]
const res_table_head = [
    '키',
    '설명',
    '타입',
];
const res_table_body = [
    ['code', '결과코드', 'Integer'],
    ['message', '결과 메시지( code 가 0 보다 작은경우 실패사유 표기)', 'String'],
    ['data', '리턴값', 'Object'],
]
const res_data_table_head = [
    '키',
    '설명',
    '타입',
];
const res_data_table_body = [
    ['page', '페이지번호', 'Integer'],
    ['page_size', '페이지당 출력갯수', 'Integer'],
    ['total', '총갯수', 'Integer'],
    ['content', '결과값', 'Array'],
]
const res_data_content_table_head = [
    '키',
    '설명',
    '타입',
];
const res_data_content_table_body = [
    ['code', '결과코드(API 수신유무)', 'Integer'],
    ['type', '메세지타입', 'Integer'],
    ['msg', '메시지 내용', 'String'],
    ['sender', '발신자 전화번호', 'String'],
    ['receiver', '수신자 전화번호', 'String'],
    ['msg_key', '메세지키', 'String'],
    ['res_msg', '결과메세지', 'String'],
    ['created_at', '발송시간', 'yyyy-mm-dd hh:mm:ss'],
]
const FriendtalkList = (props) => {
    return (
        <>
            <Title2 style={{ margin: '1rem 0' }}>전송내역조회</Title2>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                최근 요청및 처리된 전송내역을 조회하실 수 있습니다.<br />
                사이트내 전송결과조회 페이지와 동일한 내역이 조회되며, 날짜기준으로 조회가 가능합니다.<br />
                발신번호별 조회기능은 제공이 되지 않습니다.<br />
                조회시작일을 지정하실 수 있으며, 시작일 이전 몇일까지 조회할지 설정이 가능합니다.<br />
                조회시 최근발송내역 순서로 소팅됩니다.
            </Title3>
            <Title3>
                [ Request ]
            </Title3>
            <Col style={{ padding: '2rem', background: '#222', rowGap: '0.5rem' }}>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>POST</div>
                    <div style={{ color: 'yellow' }}>/api/alimtalk/v1/list</div>
                    <div style={{ color: '#fff' }}>HTTP/1.1</div>
                </Row>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>Host:</div>
                    <div style={{ color: 'orange' }}>{process.env.API_URL}</div>
                </Row>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>Service Port:</div>
                    <div style={{ color: 'orange' }}>443</div>
                </Row>
            </Col>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
            https 프로토콜을 사용하여 POST로 요청합니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {req_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {req_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
            <Title3>
                [ Response ]
            </Title3>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                응답 바디는 JSON 객체로 구성됩니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {res_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                data JSON 구성입니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {res_data_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res_data_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                content JSON 구성입니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {res_data_content_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res_data_content_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
export default FriendtalkList;