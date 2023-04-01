import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="section-share section-about">
                    <div className="section-container">
                        <div className="section-about-header">
                            Truyền thông nói về Pikachu
                        </div>
                        <div className="section-about-content">
                            <div className="content-left">
                                <iframe 
                                    width="100%" 
                                    height="400" 
                                    src="https://www.youtube.com/embed/VFDh0F1yB0U" 
                                    title="ĐỦ TRẢI SẼ THẤM (QUIEZ REMIX) - MIKE X CHIENNHATLANG ♫ 1 HOUR VERSION OFFICIAL" 
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowfullscreen
                                >
                                </iframe>
                            </div>
                            <div className="content-right">
                                <p>
                                    Content Marketing (hay tiếp thị nội dung) là một cách tiếp thị tập trung vào việc tạo dựng và phân phối nội dung có giá trị,
                                    phù hợp và đồng nhất đến với khách hàng. Thông qua hình thức marketing này, người dùng sẽ nhận được lợi ích từ đó và muốn mua sản phẩm, 
                                    dịch vụ để thực sự trải nghiệm chúng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
