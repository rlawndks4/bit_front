import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Col, Row, Title2, Title3 } from "src/components/elements/styled-components";

const req_table_head = [
    '키',
    '설명',
    '필수',
    '타입',
];
const req_table_body = [
    ['api_key', '인증용 API Key', 'O', 'String'],
    ['user_id', '사용자id', 'O', 'String'],
]
const res_table_head = [
    '키',
    '설명',
    '타입',
];
const res_table_body = [
    ['code', '결과코드(API 수신유무)', 'Integer'],
    ['message', '결과 메시지( code 가 0 보다 작은경우 실패사유 표기)', 'String'],
    ['data', '리턴값', 'Array'],
]
const res_data_table_head = [
    '키',
    '설명',
    '타입',
];
const res_data_table_body = [
    ['token', '생성된 TOKEN 스트링이 리턴됩니다.', 'String'],
    ['expired', '만료시간을 리턴합니다.', 'Integer'],
]
const AlimtalkToken = (props) => {
    return (
        <>
            <Title2 style={{ margin: '1rem 0' }}>API 호출을 위한 토큰 생성</Title2>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                API 호출을 위해서는 반드시 API 호출 토큰 스트링을 생성해야 합니다.<br />
                생성된 토큰 문자열은 호출한 API 스트링의 소유자 및 유효시간 정보를 포함하고 있습니다.
            </Title3>
            <Title3>
                [ Request ]
            </Title3>
            <Col style={{ padding: '2rem', background: '#222', rowGap: '0.5rem' }}>
                <Row style={{ columnGap: '0.5rem', overflow: 'auto',paddingBottom:'1rem' }}>
                    <div style={{ color: '#fff' }}>POST</div>
                    <div style={{ color: 'yellow', maxWidth: '500px' }}>/api/alimtalk/v1/token/create/:num/:num_unit</div>
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
                https 프로토콜을 사용하여 POST로 요청합니다. API호출 URL의 유효시간을 결정하며 URL 의 구성중 "num" 은
                요청의 유효시간을 의미하며, "num_unit" 는 y(년), m(월), d(일), h(시), i(분), s(초) 중 하나이며 설정한 시간내에서만 토큰이 유효합니다.
                운영중이신 보안정책에 따라 토큰의 유효시간을 특정 기간만큼 지정할 경우 매번 호출할 필요없이 해당 유효시간내에 재사용 가능합니다.
                주의하실 점은 서버를 여러대 운영하실 경우 토큰은 서버정보를 포함하므로 각 서버에서 생성된 토큰 문자열을 사용하셔야 하며
                토큰 문자열을 공유해서 사용하실 수 없습니다.
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
        </>
    )
}
export default AlimtalkToken;